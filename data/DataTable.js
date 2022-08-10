const { VarChar,Int } = require("mssql");
const { DTOTable } = require("../DTO/DTOTable");
const { Conection } = require("./Conection");

class DataTable
{
 //#region CRUD

    static registerTable=async(numberpeople)=>
    {
      
        let queryinsert = 
       `
        insert into TablesR values 
        ('Active',@NumberPeopleT) 

        `;
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('NumberPeopleT', Int, numberpeople)
        .query(queryinsert)
        pool.close();
        return true;

    }
    static disableTable=async(idtable)=>
    {
      let resultquery;
        let queryinsert = 
       `
       IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable)
       BEGIN
         select -1 as notexisttable
       END
       ELSE
       BEGIN

        update TablesR set  StateT='Inactive' 
        where IDTable=@IDTable
        select 1 as updatesuccess
        END

        `;
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('IDTable', Int, idtable)
        .query(queryinsert)
        resultquery = result.recordset[0].notexisttable; 
        if (resultquery===undefined) {
          resultquery = result.recordset[0].updatesuccess; 
        }
        pool.close();
        return resultquery;

    }
    static enableTable=async(idtable)=>
    {
      let resultquery;
        let queryinsert = 
       `
       IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable)
       BEGIN
         select -1 as notexisttable
       END
       ELSE
       BEGIN

        update TablesR set  StateT='Active' 
        where IDTable=@IDTable
        select 1 as updatesuccess
        END

        `;
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('IDTable', Int, idtable)
        .query(queryinsert)
        resultquery = result.recordset[0].notexisttable; 
        if (resultquery===undefined) {
          resultquery = result.recordset[0].updatesuccess; 
        }
        pool.close();
        return resultquery;

    }

//#endregion

//#region  GETS

  static getTable=async(idtable)=>
    {
            let resultquery;
          
            let querysearch = `

            IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable)
            BEGIN
              select -1 as notexisttable
            END
            ELSE
            BEGIN
              SELECT 
              t.IDTable,
              t.StateT,
              t.NumberPeopleT
              FROM TablesR t
              WHERE IDTable=@IDTable
            
               
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDTable', Int, idtable)
             .query(querysearch)
            resultquery = result.recordset[0].notexisttable; 
            if(resultquery===undefined)
              {
                 let resultrecordset=result.recordset[0];
                  let table = new DTOTable();
                  this.getInformation(table, resultrecordset);
                resultquery=table
              }
           pool.close();
           return resultquery;
      
    
    }
  static getSearchTables=async(idtable1=0,idtable2=99999,state="",npeople1=0,npeople2=9999)=>
    {
          
            let array=[];
            let querysearch = `

              SELECT 
              t.IDTable,
              t.StateT,
              t.NumberPeopleT
              FROM TablesR t
              where IDTable between ${idtable1} and ${idtable2}
              and StateT like '%${state}%'
              and NumberPeopleT between ${npeople1} and ${npeople2}
              
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
              let table = new DTOTable();
              this.getInformation(table, r);
              array.push(table);
            } 
              
           pool.close();
           return array;
      
    
    }
//#endregion
 //#region  GET INFORMATION


 static getInformation(table, result) {

    table.IDTable=result.IDTable
    table.StateT=result.StateT
    table.NumberPeopleT=result.NumberPeopleT
   }
  


  //#endregion
}

module.exports = { DataTable };