const { Money, VarChar, Int } = require("mssql");
const { DTODish } = require("../DTO/DTODish");
const { Conection } = require("./Conection");

class DataDish
{
    //#region CRUD

    static registerDish=async(dtodishes,arrayingredients)=>
      {
            let resultquery;
            let queryinsert = 
            `         
              IF NOT EXISTS ( SELECT IDCategory FROM Category WHERE IDCategory=@IDCategory)
              BEGIN
                select -1 as notexistcategory
              END
              ELSE
              BEGIN
                 BEGIN TRANSACTION  
                    insert into Dish values (@NameD,@IDCategory,@DescriptionD,@ImgD,@PriceD,@CostD,@QuantityAD)
                    ${this.forAddIngredients(arrayingredients)}
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
            .input('NameD', VarChar, dtodishes.NameD)
            .input('IDCategory', Int, dtodishes.Category.IDCategory)
            .input('DescriptionD', VarChar, dtodishes.DescriptionD)
            .input('ImgD', VarChar, dtodishes.ImgD)
            .input('PriceD', Money, dtodishes.PriceD)
            .input('CostD', Money, dtodishes.CostD)
            .input('QuantityAD', Int, dtodishes.QuantityAD)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcategory; 
            if (resultquery===undefined) {
              resultquery = result.recordset[0].insertsuccess; 
            }
            pool.close();
            return resultquery;
    
      }
    static updateDish=async(dtodish)=>
      {
            let resultquery;
            let queryinsert = `

            IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
            BEGIN
              select -1 as notexistdish
            END
            ELSE
            BEGIN
              IF NOT EXISTS ( SELECT IDCategory FROM Category WHERE IDCategory=@IDCategory)
              BEGIN
                select -2 as notexistcategory
              END
              ELSE
              BEGIN
                  Update Dish Set NameD=@NameD,
                  IDCategory=@IDCategory,ImgD=@ImgD,DescriptionD=@DescriptionD,
                  PriceD=@PriceD where IDDishh=@IDDishh
                  select 1 as updatesucess
              END

            END

            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDDishh', Int, dtodish.IDDishh)
            .input('NameD', VarChar, dtodish.NameD)
            .input('ImgD', VarChar, dtodish.ImgD)
            .input('DescriptionD', VarChar, dtodish.DescriptionD)
            .input('PriceD', Money, dtodish.PriceD)
            .input('IDCategory', Int, dtodish.Category.IDCategory)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistdish;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistcategory;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].updatesucess;
              }
            }
            pool.close();
            return resultquery;
    
      }
     static deleteDish=async(iddish)=>
      {
            let resultquery;
            let queryinsert = `

            IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
            BEGIN
              select -1 as notexistdish
            END
            ELSE
            BEGIN
           
              DELETE   FROM  Ingredient where IDDishh=@IDDishh
              DELETE   FROM  Dish where IDDishh=@IDDishh
              select 1 as deletsuccess

            END

            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDDishh', Int, iddish)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistdish;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].deletsuccess;
            }
            pool.close();
            return resultquery;
    
      }

    //#endregion

    //#region INGREDIENTS
      
    

    //#endregion
    
    //#region GETS
      
    static getService=async(idservice)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Servicee WHERE idservice=@idservice and Statee='Active')
            BEGIN
              select -1 as noexistservice
            END
            ELSE
            BEGIN
                SELECT * FROM Servicee
                WHERE idservice=@idservice and Statee='Active'
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('idservice', Int, idservice)
             .query(querysearch)
            resultquery = result.recordset[0].noexistservice; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let service = new DTOService();
              this.getinformation(service, resultrecordset);
              resultquery=service
            }
           pool.close();
           return resultquery;
      
    
     }

     static getServices=async(orderby="idservice")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Servicee WHERE Statee='Active'
                ORDER BY ${orderby} desc
 
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
               let service = new DTOService();
               this.getinformation(service,  r);
               array.push(service);
             } 
            pool.close();
            return array;
       
     
      }
    static getServicesMultipleID=async(arrayservices,orderby="idservice")=>
      {
              let array=[];
              let querysearch = `
  
                 SELECT * FROM Servicee
                  WHERE Statee='Active' and 
                  idservice in (
                    ${
                      this.forinsidestring(arrayservices)
                    }
                    )
                 ORDER BY ${orderby} desc
  
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)
               for (var r of result.recordset) {
                let service = new DTOService();
                this.getinformation(service,  r);
                array.push(service);
              } 
             pool.close();
             return array;
        
      
       }

      static getServicesBetweenValues=async(value1=0,value2=9999,orderby="idservice")=>
      {
              let array=[];
              let querysearch = `
  
                 SELECT * FROM Servicee 
                 WHERE 
                 Value between ${value1} AND ${value2}
                  AND
                 Statee='Active'
                 ORDER BY ${orderby} desc
  
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)
               for (var r of result.recordset) {
                let service = new DTOService();
                this.getinformation(service,  r);
                array.push(service);
              } 
             pool.close();
             return array;
        
      
       }
       static getSearchServices=async(name="",value1=0,value2=99999,orderby="idservice")=>
       {
               let array=[];
               let querysearch = `
   
                  SELECT * FROM Servicee WHERE Statee='Active'
                  AND  NameS LIKE '%${name}%' 
                  AND Value BETWEEN ${value1} AND ${value2} 
                  ORDER BY ${orderby} desc
   
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .query(querysearch)
                for (var r of result.recordset) {
                 let service = new DTOService();
                 this.getinformation(service,  r);
                 array.push(service);
               } 
              pool.close();
              return array;
         
       
        }

    //#endregion
    //#region  Get Information

    static getinformation(service, result) {

      service.idservice = result.IDService;
      service.name= result.NameS;
      service.value = result.Value;
      service.statee = result.Statee;
     
  
     }
     static forAddIngredients(array)
     {
      let stringelement="";
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
       
  
          stringelement=stringelement+
          `
          insert into Ingredient values (IDENT_CURRENT('Dish'),'${element.NameI}',${element.CostI},${element.QuantityI})
      
          `
       
      }
      return stringelement
     
     }
    //#endregion
}
module.exports = { DataDish };