const { VarChar,Int ,Date} = require("mssql");
const { DTOTableCustomer } = require("../DTO/DTOTableCustomer");
const { Conection } = require("./Conection");


class DataTableCustomer
{
    //#region CRUD

    static registerTableCustomer=async(IDTable,IDCustomer)=>
    {
        let resultquery;
       let queryinsert = `  

          IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable AND StateT='Active')
          BEGIN
            select -1 as notexisttable
          END
          ELSE
          BEGIN
            IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
            BEGIN
              select -2 as noexistcustomer
            END
            ELSE
            BEGIN
              IF EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable OR  IDCustomer=@IDCustomer)
              BEGIN
                select -3 as existtablecustomer
              END
              ELSE
              BEGIN 
               BEGIN TRANSACTION  

                INSERT INTO Table_Customer values (@IDTable,@IDCustomer)

                UPDATE TablesR SET StateT='Inactive' WHERE IDTable=@IDTable

                select 1 as insertsuccess

                
                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                COMMIT TRANSACTION  
                END   
              END
            END         
          END       
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDTable', Int, IDTable)
          .input('IDCustomer', Int, IDCustomer)
          .query(queryinsert)
          resultquery = result.recordset[0].notexisttable;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].noexistcustomer;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].existtablecustomer;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].insertsuccess;
                }
            }
          }
          pool.close();
          return resultquery;
  
    }
    static updateIDTableTableCustomer=async(IDTable,IDCustomer)=>
    {
        let resultquery;
       let queryinsert = ` 
        
       IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable AND StateT='Active')
       BEGIN
         select -1 as notexisttable
       END
       ELSE
       BEGIN
         IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
         BEGIN
           select -2 as noexistcustomer
         END
         ELSE
         BEGIN
           IF  EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable AND IDCustomer=@IDCustomer)
           BEGIN
             select -3 as existtablecustomer
           END
           ELSE
           BEGIN 
            BEGIN TRANSACTION  

            UPDATE TablesR SET TablesR.StateT='Active' FROM  TablesR INNER JOIN
            Table_Customer ON  Table_Customer.IDTable=TablesR.IDTable
            WHERE  Table_Customer.IDCustomer=@IDCustomer

             UPDATE Table_Customer SET IDTable=@IDTable WHERE IDCustomer=@IDCustomer

             UPDATE TablesR SET StateT='Inactive' WHERE IDTable=@IDTable

             select 1 as insertsuccess

             
             IF(@@ERROR > 0)  
             BEGIN  
                 ROLLBACK TRANSACTION  
             END  
             ELSE  
             BEGIN  
             COMMIT TRANSACTION  
             END   
           END
         END         
       END  
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDTable', Int, IDTable)
          .input('IDCustomer', Int, IDCustomer)
          .query(queryinsert)
          resultquery = result.recordset[0].notexisttable;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].noexistcustomer;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].existtablecustomer;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].insertsuccess;
                }
            }
          }
          pool.close();
          return resultquery;
  
    }
    static deleteTableCustomer=async(IDTable,IDCustomer)=>
    {
        let resultquery;
       let queryinsert = `  
          
              IF NOT EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable AND IDCustomer=@IDCustomer)
              BEGIN
                select -1 as notexisttablecustomer
              END
              ELSE
              BEGIN 
               BEGIN TRANSACTION  

                DELETE FROM Table_Customer WHERE  IDTable=@IDTable AND IDCustomer=@IDCustomer

                UPDATE TablesR SET StateT='Active' WHERE IDTable=@IDTable

                select 1 as insertsuccess

                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                COMMIT TRANSACTION  
                END   
              END
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDTable', Int, IDTable)
          .input('IDCustomer', Int, IDCustomer)
          .query(queryinsert)
           resultquery = result.recordset[0].notexisttablecustomer;
           if(resultquery===undefined)
             {
              resultquery = result.recordset[0].insertsuccess;
             }
          pool.close();
          return resultquery;
  
    }

    //#endregion
   
    //#region GETS

    static getTableCustomer=async(IDTable,IDCustomer)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable AND IDCustomer=@IDCustomer)
            BEGIN
              select -1 as notexisttablecustomer
            END
            ELSE
            BEGIN

              SELECT 
              tc.IDTableC,
              c.*,
              t.*
              FROM TablesR t inner join Table_Customer tc ON tc.IDTable=t.IDTable
              INNER JOIN Customer c ON c.IDCustomer=tc.IDCustomer
              WHERE tc.IDTable=@IDTable and tc.IDCustomer=@IDCustomer
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDTable', Int, IDTable)
             .input('IDCustomer', Int, IDCustomer)
             .query(querysearch)
            resultquery = result.recordset[0].notexisttablecustomer; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let tablecustomer = new DTOTableCustomer();
              this.getinformationTableCustomer(tablecustomer, resultrecordset);
              resultquery=tablecustomer
            }
           pool.close();
           return resultquery;
      
    
     }
     static getMultipleIDTableTableCustomer=async(arrayidtable,orderby="IDTable")=>
     {
             let array=[];
             let querysearch = `

             SELECT 
              tc.IDTableC,
              c.*,
              t.*
              FROM TablesR t inner join Table_Customer tc ON tc.IDTable=t.IDTable
              INNER JOIN Customer c ON c.IDCustomer=tc.IDCustomer

             WHERE 
             tc.IDTable in
             (
               ${this.forinsidestring(arrayidtable)}
             ) 
             ORDER BY ${orderby} desc

             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)        
              for (var r of result.recordset) {
               let tablecustomer = new DTOTableCustomer();
               this.getinformationTableCustomer(tablecustomer,r);
               array.push(tablecustomer);
              } 
            pool.close();
            return array;

        
     
      }
      static getMultipleIDCustomerTableCustomer=async(arrayidcustomer,orderby="IDCustomer")=>
     {
             let array=[];
             let querysearch = `
              SELECT 

              tc.IDTableC,
              c.*,
              t.*
              FROM TablesR t inner join Table_Customer tc ON tc.IDTable=t.IDTable
              INNER JOIN Customer c ON c.IDCustomer=tc.IDCustomer

             WHERE 
             tc.IDCustomer in
             (
               ${this.forinsidestring(arrayidcustomer)}
             ) 
             ORDER BY ${orderby} desc

             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)        
              for (var r of result.recordset) {
               let tablecustomer = new DTOTableCustomer();
               this.getinformationTableCustomer(tablecustomer,r);
               array.push(tablecustomer);
              } 
            pool.close();
            return array;

        
     
      }
      static getSearchTableCustomer=async(
        IDTableC1=0,IDTableC2=9999,
        IDTable1=0,IDTable2=9999,
        IDCustomer1=0,IDCustomer2=9999,
        NamesC="",LastNameC="",
        NumberPeopleT1=0,NumberPeopleT2=9999,
        orderby="IDTableC")=>
      {
              let array=[];
              let querysearch = `
 
                SELECT 
                tc.IDTableC,
                c.*,
                t.*
                FROM TablesR t inner join Table_Customer tc ON tc.IDTable=t.IDTable
                INNER JOIN Customer c ON c.IDCustomer=tc.IDCustomer

                WHERE 

                tc.IDTableC between ${IDTableC1} and ${IDTableC2}
                and tc.IDTable between ${IDTable1} and ${IDTable2}
                and tc.IDCustomer between ${IDCustomer1} and ${IDCustomer2}
                and c.NamesC like '%${NamesC}%'
                and c.LastNameC like '%${LastNameC}%'
                and t.NumberPeopleT between ${NumberPeopleT1} and ${NumberPeopleT2}

                ORDER BY ${orderby} desc
 
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)        
               for (var r of result.recordset) {
                let tablecustomer = new DTOTableCustomer();
                this.getinformationTableCustomer(tablecustomer,r);
                array.push(tablecustomer);
               } 
             pool.close();
             return array;
 
         
      
       }
    //#endregion

   //#region GET INFORMATION

   static getinformationTableCustomer(tablecustomer, result) {

    
    tablecustomer.IDTableC=result.IDTableC;

    tablecustomer.Table.IDTable=result.IDTable;
    tablecustomer.Table.NumberPeopleT=result.NumberPeopleT;
    tablecustomer.Table.StateT=result.StateT;

    tablecustomer.Customer.IDCustomer = result.IDCustomer;
    tablecustomer.Customer.NamesC = result.NamesC;
    tablecustomer.Customer.LastNameC = result.LastNameC;
    tablecustomer.Customer.PhoneNumberC = result.PhoneNumberC;
    
   }
 
   //#endregion

   //#region OTHERS

   static forinsidestring(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (index===array.length-1) {
        stringelement=stringelement+element
      }
      else
      {
        stringelement=stringelement+element+","
      }
     
    }
    return stringelement
   
   }
  
   //#endregion
}
module.exports = { DataTableCustomer };