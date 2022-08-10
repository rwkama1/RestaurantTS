const { VarChar,Int, Money } = require("mssql");
const { DTOCategory } = require("../DTO/DTOCategory");

const { Conection } = require("./Conection");

class DataCategory
{
    //#region CRUD

    static registerCategory=async(dtocategory)=>
    {
          let queryinsert = ` 
            insert into Category values (@NameC,@DescriptionC)           
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NameC', VarChar, dtocategory.NameC)
          .input('DescriptionC', VarChar, dtocategory.DescriptionC)
          .query(queryinsert)
          pool.close();
          return true;
  
    }
    static updateCategory=async(dtocategory)=>
    {
      let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDCategory FROM Category WHERE IDCategory=@IDCategory)
          BEGIN
            select -1 as notexistcategory
          END
          ELSE
          BEGIN
            UPDATE Category Set NameC=@NameC,DescriptionC=@DescriptionC
            WHERE IDCategory=@IDCategory
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDCategory', Int, dtocategory.IDCategory)
          .input('NameC', VarChar, dtocategory.NameC)
          .input('DescriptionC', VarChar, dtocategory.DescriptionC)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistcategory;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
  
    
    //#endregion

    //#region GETS

    static getCategory=async(idcategory)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDCategory FROM Category WHERE IDCategory=@IDCategory)
            BEGIN
              select -1 as notexistcategory
            END
            ELSE
            BEGIN
                SELECT * FROM Category
                WHERE IDCategory=@IDCategory
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCategory', Int, idcategory)
             .query(querysearch)
            resultquery = result.recordset[0].notexistcategory; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let cat = new DTOCategory();
              this.getinformation(cat, resultrecordset);
              resultquery=cat
            }
           pool.close();
           return resultquery;
      
    
     }
     static getCategories=async(orderby="NameC")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Category 
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var resultrecordset of result.recordset) {
              let cat = new DTOCategory();
              this.getinformation(cat, resultrecordset);
              array.push(cat);
            } 
           pool.close();
           return array;
      
    
     }
     static getSearchCategories=async(idcategory1=0,idcategory2=9999,NameC="",
     orderby="NameC")=>
     {
             let array=[];
             let querysearch = `
 
             SELECT * FROM Category 
             WHERE IDCategory between ${idcategory1} and ${idcategory2}
             AND NameC like '%${NameC}%'
             ORDER BY ${orderby} desc
             `

             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
                let cat = new DTOCategory();
                this.getinformation(cat, r);
                array.push(cat);
             } 
            pool.close();
            return array;

      }
    //#endregion

   //#region GET INFORMATION

   static getinformation(category, result) {

    category.IDCategory = result.IDCategory;
    category.NameC = result.NameC;
    category.DescriptionC = result.DescriptionC;
   
   }

 
   //#endregion
}
module.exports = { DataCategory };