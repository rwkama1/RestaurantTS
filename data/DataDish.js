const { Money, VarChar, Int } = require("mssql");
const { DTODish } = require("../DTO/DTODish");
const { DTOIngredients } = require("../DTO/DTOIngredients");

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
           
              DELETE FROM  Ingredient where IDDishh=@IDDishh
              DELETE FROM  Dish where IDDishh=@IDDishh
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
    static addQuantity=async(iddish,quantity)=>
      {
            let resultquery;
            let queryinsert = `

            IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
            BEGIN
              select -1 as notexistdish
            END
            ELSE
            BEGIN
              
                  Update Dish Set QuantityAD=QuantityAD+@QuantityAD
                   where IDDishh=@IDDishh
                  select 1 as updatesucess
            END

            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDDishh', Int, iddish)
            .input('QuantityAD', Money,quantity )
            .query(queryinsert)
            resultquery = result.recordset[0].notexistdish;
            if(resultquery===undefined)
            {
                  resultquery = result.recordset[0].updatesucess;
            }
            pool.close();
            return resultquery;
    
      }

    //#endregion

    //#region INGREDIENTS
      
    static registerIngredient=async(iddish,namei,costi,quantity)=>
    {
          let resultquery;
          let queryinsert = 
          `         
          IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
          BEGIN
            select -1 as notexistdish
          END
          ELSE
          BEGIN
            BEGIN TRANSACTION  
                insert into Ingredient values (@IDDishh,@NameI,@CostI,@QuantityI)
                UPDATE Dish set CostD=CostD+@CostI*@QuantityI where IDDishh=@IDDishh
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
          .input('IDDishh', Int, iddish)
          .input('NameI', VarChar,namei )
          .input('CostI', Money,costi )
          .input('QuantityI', Int, quantity)
          .query(queryinsert)
          resultquery = result.recordset[0].notexistdish; 
          if (resultquery===undefined) {
            resultquery = result.recordset[0].insertsuccess; 
          }
          pool.close();
          return resultquery;
  
    }
    static updateIngredientName=async(idingredientt,namei,iddish)=>
    {
          let resultquery;
          let queryinsert = 
          `         
          IF NOT EXISTS ( SELECT IDDishh FROM Ingredient WHERE IDDishh=@IDDishh and IDIngredientt=@IDIngredientt)
          BEGIN
            select -1 as notexistingredient
          END
          ELSE
          BEGIN
          
                UPDATE Ingredient set NameI=@NameI
                WHERE IDDishh=@IDDishh and IDIngredientt=@IDIngredientt     
                select 1 as updatesuccess  
          END

          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDDishh', Int, iddish)
          .input('IDIngredientt', Int, idingredientt)
          .input('NameI', VarChar,namei )
          .query(queryinsert)
          resultquery = result.recordset[0].notexistingredient; 
          if (resultquery===undefined) {
            resultquery = result.recordset[0].updatesuccess; 
          }
          pool.close();
          return resultquery;
  
    }
    static removeIngredient=async(idingredientt,iddish)=>
    {
          let resultquery;
          let queryinsert = 
          `         
          IF NOT EXISTS ( SELECT IDDishh FROM Ingredient WHERE IDDishh=@IDDishh and IDIngredientt=@IDIngredientt)
          BEGIN
            select -1 as notexistingredient
          END
          ELSE
          BEGIN
                BEGIN TRANSACTION  

                UPDATE Dish set CostD=CostD-(CostI*QuantityI) FROM Dish,Ingredient
                WHERE Dish.IDDishh=@IDDishh and IDIngredientt=@IDIngredientt

                  DELETE  FROM Ingredient
                  WHERE IDDishh=@IDDishh and IDIngredientt=@IDIngredientt     

                

                  select 1 as deletesucess  

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
          .input('IDDishh', Int, iddish)
          .input('IDIngredientt', Int, idingredientt)
          
          .query(queryinsert)
          resultquery = result.recordset[0].notexistingredient; 
          if (resultquery===undefined) {
            resultquery = result.recordset[0].deletesucess; 
          }
          pool.close();
          return resultquery;
  
    }
    static getIngredient=async(idingredientt)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDIngredientt FROM Ingredient WHERE IDIngredientt=@IDIngredientt)
            BEGIN
              select -1 as noexistingredientt
            END
            ELSE
            BEGIN
                SELECT 
                i.IDIngredientt,
                i.iddishh,
                i.NameI,
                i.CostI,
                i.QuantityI,

                d.NameD,
                d.IDCategory,
                d.DescriptionD,
                d.ImgD,
                d.PriceD,
                d.CostD,
                d.QuantityAD
                FROM Ingredient i inner join Dish d
                ON i.iddishh=d.iddishh          
                WHERE IDIngredientt=@IDIngredientt
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDIngredientt', Int, idingredientt)
             .query(querysearch)
            resultquery = result.recordset[0].noexistingredientt; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let ingredient = new DTOIngredients();
              this.getIngredientInformation(ingredient, resultrecordset);
              resultquery=service
            }
           pool.close();
           return resultquery;
      
    
     }
    static getIngredientsDish=async(iddish,orderby=`idingredientt`)=>
     {
             let resultquery;
             let array=[];
             let querysearch = `
 
             IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
             BEGIN
               select -1 as noexistdish
             END
             ELSE
             BEGIN
                 SELECT 
                 i.IDIngredientt,
                 i.iddishh,
                 i.NameI,
                 i.CostI,
                 i.QuantityI,
 
                 d.NameD,
                 d.IDCategory,
                 d.DescriptionD,
                 d.ImgD,
                 d.PriceD,
                 d.CostD,
                 d.QuantityAD

                 FROM Ingredient i inner join Dish d
                 ON i.iddishh=d.iddishh          
                 WHERE d.IDDishh=@IDDishh
                 order by ${orderby} 
             END
 
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .input('IDDishh', Int, iddish)
              .query(querysearch)
              resultquery = result.recordset[0].noexistdish; 
              if(resultquery===undefined)
              {
                for (var r of result.recordset) {
                  let ingredient = new DTOIngredients();
                  this.getIngredientInformation(ingredient, r);
                  array.push(ingredient);
                } 
                resultquery=array
              }

            pool.close();
            return resultquery;
       
     
      }

    //#endregion
    
    //#region GETS
      
    static getDish=async(iddish,orderby=`idingredientt`)=>
    {
            let resultquery;
            let array=[];
            let querysearch = `

            IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
            BEGIN
              select -1 as noexistdish
            END
            ELSE
            BEGIN
              SELECT 
              i.IDIngredientt,
              i.iddishh,
              i.NameI,
              i.CostI,
              i.QuantityI,

              d.NameD,
              d.IDCategory,
              d.DescriptionD,
              d.ImgD,
              d.PriceD,
              d.CostD,
              d.QuantityAD,

              c.NameC,
              c.DescriptionC
            
              FROM Ingredient i inner join Dish d
              ON i.iddishh=d.iddishh  inner join Category c
              on c.idcategory=d.idcategory        
              WHERE d.IDDishh=@IDDishh
              order by ${orderby}
               
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDDishh', Int, iddish)
             .query(querysearch)
            resultquery = result.recordset[0].noexistdish; 
            if(resultquery===undefined)
              {
                for (var r of result.recordset) {
                  let ingredient = new DTOIngredients();
                  this.getDishInformation(ingredient, r);
                  array.push(ingredient);
                } 
                resultquery=array
              }
           pool.close();
           return resultquery;
      
    
     }
     static getDishByCategory=async(idcategory,orderby=`iddishh`)=>
    {
            let resultquery;
            let array=[];
            let querysearch = `

            IF NOT EXISTS ( SELECT idcategory FROM Category WHERE idcategory=@idcategory)
            BEGIN
              select -1 as noexistcategory
            END
            ELSE
            BEGIN
              SELECT 
              i.IDIngredientt,
              i.iddishh,
              i.NameI,
              i.CostI,
              i.QuantityI,

              d.NameD,
              d.IDCategory,
              d.DescriptionD,
              d.ImgD,
              d.PriceD,
              d.CostD,
              d.QuantityAD,

              c.NameC,
              c.DescriptionC
            
              FROM Ingredient i inner join Dish d
              ON i.iddishh=d.iddishh  inner join Category c
              on c.idcategory=d.idcategory        
              WHERE d.idcategory=@idcategory
              order by ${orderby}
               
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('idcategory', Int, idcategory)
             .query(querysearch)
            resultquery = result.recordset[0].noexistcategory; 
            if(resultquery===undefined)
              {
                for (var r of result.recordset) {
                  let ingredient = new DTOIngredients();
                  this.getDishInformation(ingredient, r);
                  array.push(ingredient);
                } 
                resultquery=array
              }
           pool.close();
           return resultquery;
      
    
     }
     static getSearchDish=async(iddish1=0,iddish2=9999
      ,named="",idcategory1=0,idcategory2=9999,price1=0,price2=9999
      ,cost1=0,cost2=9999,quantity1=0,quantity2=9999,namei="",
      quantityi1=0,quantityi2=9999,costi1=0,costi2=9999,
      idingredient1=0,idingredient2=9999,namecategory=""
      ,orderby=`IDDishh`)=>
    {
          
            let array=[];
            let querysearch = `

              SELECT 
              i.IDIngredientt,
              i.iddishh,
              i.NameI,
              i.CostI,
              i.QuantityI,

              d.NameD,
              d.IDCategory,
              d.DescriptionD,
              d.ImgD,
              d.PriceD,
              d.CostD,
              d.QuantityAD,

              c.NameC,
              c.DescriptionC
            
              FROM Ingredient i inner join Dish d
              ON i.iddishh=d.iddishh  inner join Category c
              on c.idcategory=d.idcategory        
              WHERE 
              d.IDDishh between ${iddish1} and ${iddish2}
              and d.NameD like '%${named}%'
              and d.IDCategory between ${idcategory1} and ${idcategory2}
              and d.PriceD between ${price1} and ${price2}
              and d.CostD between ${cost1} and ${cost2}
              and d.QuantityAD between ${quantity1} and ${quantity2}

              and i.IDIngredientt between ${idingredient1} and ${idingredient2}
              and i.NameI like '%${namei}%'
              and i.CostI between ${costi1} and ${costi2}
              and i.QuantityI between ${quantityi1} and ${quantityi2}

              and c.NameC like '%${namecategory}%'
              order by ${orderby}
              
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
                for (var r of result.recordset) {
                  let ingredient = new DTOIngredients();
                  this.getDishInformation(ingredient, r);
                  array.push(ingredient);
                } 
              
              
           pool.close();
           return array;
      
    
     }
     static getDishesMultipleID=async(arrayydish,orderby=`iddishh`)=>
     {
          
             let array=[];
             let querysearch = `

               SELECT 
               Dish.*,
               Category.NameC,
               Category.DescriptionC
               FROM
               Dish inner join Category
               ON Dish.IdCategory=Category.IdCategory      
               WHERE IDDishh in
                (
                  ${this.forinsidestringdish(arrayydish)}
                )
               order by ${orderby}           
 
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
           
                 for (var r of result.recordset) {
                   let dish = new DTODish();
                   this.getWithoutIngredientsDishInformation(dish, r);
                   array.push(dish);
            
               }
            pool.close();
            return array;
       
     
      }
    //#endregion
    //#region  GET INFORMATION


    static getIngredientInformation(ingredient, result) {

      ingredient.IDIngredientt=result.IDIngredientt
      ingredient.iddishh=result.iddishh
      ingredient.NameI=result.NameI
      ingredient.CostI=result.CostI
      ingredient.QuantityI=result.QuantityI

      ingredient.NameD=result.NameD
      ingredient.IDCategory=result.IDCategory
      ingredient.DescriptionD=result.DescriptionD
      ingredient.ImgD=result.ImgD
      ingredient.PriceD=result.PriceD
      ingredient.CostD=result.CostD
      ingredient.QuantityAD=result.QuantityAD

      ingredient.Dishh=null;
     
     
  
     }
     static getDishInformation(dish, result) {

      dish.NameD=result.NameD
      dish.IDCategory=result.IDCategory
      dish.DescriptionD=result.DescriptionD
      dish.ImgD=result.ImgD
      dish.PriceD=result.PriceD
      dish.CostD=result.CostD
      dish.QuantityAD=result.QuantityAD

      dish.IDIngredientt=result.IDIngredientt
      dish.iddishh=result.iddishh
      dish.NameI=result.NameI
      dish.CostI=result.CostI
      dish.QuantityI=result.QuantityI

      dish.NameC=result.NameC
      dish.DescriptionC=result.DescriptionC

      dish.Dishh=null;

     }
     static getWithoutIngredientsDishInformation(dish, result) {

      dish.IDDishh=result.IDDishh
      dish.NameD=result.NameD
      dish.DescriptionD=result.DescriptionD
      dish.ImgD=result.ImgD
      dish.PriceD=result.PriceD
      dish.CostD=result.CostD
      dish.QuantityAD=result.QuantityAD

      dish.Category.IDCategory=result.IDCategory
      dish.Category.NameC=result.NameC
      dish.Category.DescriptionC=result.DescriptionC

     }
 
    //#endregion
    //#region OTHERS

    static forinsidestringdish(array)//pass all id to string for sql query
    {
     let stringelement="";
     for (let index = 0; index < array.length; index++) {
       const element = array[index];
       if (index===array.length-1) {
         stringelement=stringelement+element.iddish
       }
       else
       {
         stringelement=stringelement+element.iddish+","
       }
      
     }
     return stringelement
    
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