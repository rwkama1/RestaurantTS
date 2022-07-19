const { VarChar,Int } = require("mssql");
const { DTOCustomer } = require("../DTO/DTOCustomer");

const { Conection } = require("./Conection");

class DataCustomer
{
    //#region CRUD

    static registerCustomer=async(dtocustomer)=>
    {
     
          let queryinsert = 
          `
            insert into Customer values 
            (@NamesC,@LastNameC,@PhoneNumberC)
        
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NamesC', VarChar, dtocustomer.NamesC)
          .input('LastNameC', VarChar, dtocustomer.LastNameC)
          .input('PhoneNumberC', VarChar, dtocustomer.PhoneNumberC)
          .query(queryinsert)
          pool.close();
          return true;
  
    }
    static updateCustomer=async(dtocustomer)=>
    {
          let resultquery;
          let queryupdate = 
          `

          IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
          BEGIN
            select -1 as notexistcustomer
          END
          ELSE
          BEGIN
            UPDATE Customer 
            Set NamesC=@NamesC,LastNameC=@LastNameC,
            PhoneNumberC=@PhoneNumberC
             WHERE IDCustomer=@IDCustomer
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDCustomer', Int, dtocustomer.IDCustomer)
          .input('NamesC', VarChar, dtocustomer.NamesC)
          .input('LastNameC', VarChar, dtocustomer.LastNameC)
          .input('PhoneNumberC', VarChar, dtocustomer.PhoneNumberC)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistcustomer;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
   
    //#endregion

    //#region GETS

    static getCustomer=async(idcustomer)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
            BEGIN
              select -1 as notexistcustomer
            END
            ELSE
            BEGIN
               SELECT * FROM Customer WHERE IDCustomer=@IDCustomer
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCustomer', Int, idcustomer)
             .query(querysearch)
              resultquery = result.recordset[0].notexistcustomer; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let customer = new DTOCustomer();
              this.getinformation(customer, resultrecordset);
              resultquery=customer
            }
           pool.close();
           return resultquery;
      
    
     }

     static getCustomers=async(orderby="IDCustomer")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Customer
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var cust of result.recordset) {
              let customer = new DTOCustomer();
              this.getinformation(customer, cust);
              array.push(customer);
            } 
           pool.close();
           return array;
      
    
     }

     static getSearchCustomers=async(idcustomer1=0,idcustomer2=99999
      ,namec="",lastnamec="",phonename=""
     ,orderby="IDCustomer")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Customer WHERE
                IDCustomer between ${idcustomer1} and ${idcustomer2}
                AND NamesC LIKE '%${namec}%' 
                AND LastNameC LIKE '%${lastnamec}%'
                AND PhoneNumberC LIKE '%${phonename}%'  
                ORDER BY ${orderby} desc
             `

           
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var cust of result.recordset) {
                let customer = new DTOCustomer();
                this.getinformation(customer, cust);
                array.push(customer);
              } 
            pool.close();
            return array;
       
     
      }

    //#endregion

   //#region GET INFORMATION

   static getinformation(customer, result) {

    customer.IDCustomer = result.IDCustomer;
    customer.NamesC = result.NamesC;
    customer.LastNameC = result.LastNameC;
    customer.PhoneNumberC = result.PhoneNumberC;

   }

   //#endregion
}
module.exports = { DataCustomer };