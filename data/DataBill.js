const { VarChar,Int, Money, Date } = require("mssql");
const { DTOBill } = require("../DTO/DTOBill");

const { Conection } = require("./Conection");

class DataBill
{
    //#region CRUD

    static registerBill=async(dateb,idorder,idcustomer,vat)=>
    {
        let resultquery;
       let queryinsert = `   
            
            IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE 
               IDOrder=@IDOrder and IDCustomer=@IDCustomer and StateO='Confirmed')
            BEGIN
              SELECT -1 as notexistorderornotconfirmed
            END
            ELSE
            BEGIN

              INSERT INTO Bill 
              SELECT 
                @DateB AS DateB, 

                SUM(AmountDO) as SubTotal, 

                (
                  (
                    SUM(AmountDO) * @VATB / 100
                  ) + SUM(AmountDO)
                ) as TotalB, 

                @VATB as VATB, 

                'Pending' as StateB, 

                @IDOrder as IDOrder 
              FROM 
                Orderr o 
                INNER JOIN DetailOrder do ON o.IDOrder = do.IDOrder 
              WHERE 
                o.IDOrder = @IDOrder
                SELECT  1 AS insertsuccess  

            END       
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDOrder', Int, idorder)
          .input('IDCustomer', Int, idcustomer)
          .input('DateB', Date, dateb)
          .input('VATB', Money, vat)
          .query(queryinsert)
            resultquery = result.recordset[0].notexistorderornotconfirmed;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].insertsuccess;
            }                                                                  
          pool.close();
          return resultquery;
  
    }
    static updateDateBill=async(dateb,idbill)=>
    {
        let resultquery;
       let queryinsert = `   
            
            IF NOT EXISTS ( SELECT IDBilll FROM Bill WHERE 
              IDBilll=@IDBilll )
            BEGIN
              SELECT -1 as notexistbill
            END
            ELSE
            BEGIN
               UPDATE Bill SET DateB=@DateB where IDBilll=@IDBilll
               SELECT 1 as updatesuccess
            END   
                
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDBilll', Int, idbill)
          .input('DateB', Date, dateb)
          .query(queryinsert)
           resultquery = result.recordset[0].notexistbill;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }                                                                  
          pool.close();
          return resultquery;
  
    }
    static collectBill=async(idbill)=>
    {
        let resultquery;
        let queryinsert = `   
            
            IF NOT EXISTS ( SELECT IDBilll FROM Bill WHERE 
              IDBilll=@IDBilll )
            BEGIN
              SELECT -1 as notexistbill
            END
            ELSE
            BEGIN
              BEGIN TRANSACTION 

               UPDATE Bill SET StateB='Cashed' where IDBilll=@IDBilll
               
               UPDATE Dish SET QuantityAD=QuantityAD-QuantityDO
               FROM 
               Bill b INNER JOIN Orderr o ON o.IDOrder=b.IDOrder
               INNER JOIN  DetailOrder do ON do.IDOrder=o.IDOrder 
               INNER JOIN Dish d ON d.IDDishh=do.IDDishh 
               WHERE b.IDBilll=@IDBilll

               SELECT 1 as updatesuccess


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
          .input('IDBilll', Int, idbill)
          .query(queryinsert)
           resultquery = result.recordset[0].notexistbill;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }                                                                  
          pool.close();
          return resultquery;
  
    }
    static cancelBill=async(idbill)=>
    {
        let resultquery;
        let queryinsert = `   
            
            IF NOT EXISTS ( SELECT IDBilll FROM Bill WHERE 
              IDBilll=@IDBilll )
            BEGIN
              SELECT -1 as notexistbill
            END
            ELSE
            BEGIN
               UPDATE Bill SET StateB='Canceled' where IDBilll=@IDBilll
               SELECT 1 as updatesuccess
            END   
                
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDBilll', Int, idbill)
          .query(queryinsert)
           resultquery = result.recordset[0].notexistbill;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }                                                                  
          pool.close();
          return resultquery;
  
    }
    //#endregion

    //#region GETS

    static getBill=async(idbill)=>
    {
            let array=[];
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDBilll FROM Bill WHERE 
              IDBilll=@IDBilll )
            BEGIN
              SELECT -1 as notexistbill
            END
            ELSE
             BEGIN

              SELECT

              b.*,
            
              o.DateO,
              o.StateO,
              o.SpecialRequirement,
              o.NumberPeople,
              o.IDCustomer,
            
              do.IDDetailO,
              do.QuantityDO,
              do.AmountDO,
              do.IDDishh,
            
              d.NameD,
              d.IDCategory,
              d.DescriptionD,
              d.ImgD,
              d.PriceD,
            
              c.NamesC,
              c.LastNameC,
              c.PhoneNumberC
                    
              FROM

              Bill b INNER JOIN Orderr o ON o.IDOrder=b.IDOrder
              INNER JOIN  DetailOrder do ON do.IDOrder=o.IDOrder 
              INNER JOIN Dish d ON d.IDDishh=do.IDDishh 
              INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer
              WHERE b.IDBilll=@IDBilll
            
            END
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDBilll', Int, idbill)
             .query(querysearch)
            resultquery = result.recordset[0].notexistbill; 
            if (resultquery===undefined) {
              for (var r of result.recordset) {
                  let dtobill = new DTOBill();
                  this.getinformation(dtobill, r);
                  array.push(dtobill);
                } 
                resultquery=array
            }
            
           pool.close();
           return resultquery;
      
    
     }  
    static getBillMultipleID=async(arrayid,orderby="IDBilll")=>
    {
             let array=[];
            let querysearch = `
            
            SELECT

            b.*,
          
            o.DateO,
            o.StateO,
            o.SpecialRequirement,
            o.NumberPeople,
            o.IDCustomer,
          
            do.IDDetailO,
            do.QuantityDO,
            do.AmountDO,
            do.IDDishh,
          
            d.NameD,
            d.IDCategory,
            d.DescriptionD,
            d.ImgD,
            d.PriceD,
          
            c.NamesC,
            c.LastNameC,
            c.PhoneNumberC
                  
            FROM

            Bill b INNER JOIN Orderr o ON o.IDOrder=b.IDOrder
            INNER JOIN  DetailOrder do ON do.IDOrder=o.IDOrder 
            INNER JOIN Dish d ON d.IDDishh=do.IDDishh 
            INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer

            WHERE b.IDBilll in 
            (
              ${
                this.forinsidestring(arrayid)
                }
            )
               
            ORDER BY ${orderby} desc
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)        
             for (var r of result.recordset) {
              let dtobill = new DTOBill();
              this.getinformation(dtobill, r);
              array.push(dtobill);
            } 
           pool.close();
           return array;
      }
     static getSearchBill=async(IDBilll1=0,IDBilll2=9999,
      DateB1='2000-08-08',DateB2='2100-08-08',
      SubtotalB1=0,SubtotalB2=9999,
      TotalB1=0,TotalB2=9999, VATB1=0,VATB2=9999,
      StateB="",IDOrder1=0,IDOrder2=9999,IDCustomer1=0,IDCustomer2=9999,
      NameC=""
      ,orderby="IDBilll")=>
      {
               let array=[];
              let querysearch = `
              
              SELECT
  
              b.*,
            
              o.DateO,
              o.StateO,
              o.SpecialRequirement,
              o.NumberPeople,
              o.IDCustomer,
            
              do.IDDetailO,
              do.QuantityDO,
              do.AmountDO,
              do.IDDishh,
            
              d.NameD,
              d.IDCategory,
              d.DescriptionD,
              d.ImgD,
              d.PriceD,
            
              c.NamesC,
              c.LastNameC,
              c.PhoneNumberC
                    
              FROM
  
              Bill b INNER JOIN Orderr o ON o.IDOrder=b.IDOrder
              INNER JOIN  DetailOrder do ON do.IDOrder=o.IDOrder 
              INNER JOIN Dish d ON d.IDDishh=do.IDDishh 
              INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer
  
              WHERE 

              b.IDBilll between ${IDBilll1} and ${IDBilll2}
              AND b.DateB between @DateB1 and @DateB2
              AND b.SubtotalB between ${SubtotalB1} and ${SubtotalB2}
              AND b.TotalB between ${TotalB1} and ${TotalB2}
              AND b.VATB between ${VATB1} and ${VATB2}
              AND b.IDOrder between ${IDOrder1} and ${IDOrder2}
              AND o.IDCustomer between ${IDCustomer1} and ${IDCustomer2}
              AND b.StateB like '%${StateB}%'
              AND c.NamesC like '%${NameC}%'
              
              ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('DateB1', Date, DateB1)
               .input('DateB2', Date, DateB2)
               .query(querysearch)        
               for (var r of result.recordset) {
                let dtobill = new DTOBill();
                this.getinformation(dtobill, r);
                array.push(dtobill);
              } 
             pool.close();
             return array;
        }
    
   
    
    //#endregion

   //#region GET INFORMATION

   static getinformation(dtobill, result) {

    
    dtobill.IDBilll=result.IDBilll;
    dtobill.DateB=result.DateB;
    dtobill.SubtotalB=result.SubtotalB;
    dtobill.TotalB=result.TotalB;
    dtobill.VATB=result.VATB;
    dtobill.StateB=result.StateB;
    dtobill.DetailOrder.Order.IDOrder=result.IDOrder;
  
    dtobill.DetailOrder.Order.DateO=result.DateO;
    dtobill.DetailOrder.Order.StateO=result.StateO;
    dtobill.DetailOrder.Order.SpecialRequirement=result.SpecialRequirement;
    dtobill.DetailOrder.Order.NumberPeople=result.NumberPeople;
    dtobill.DetailOrder.Order.Customer.IDCustomer=result.IDCustomer;
    
    dtobill.DetailOrder.IDDetailO=result.IDDetailO;
    dtobill.DetailOrder.QuantityDO=result.QuantityDO;
    dtobill.DetailOrder.AmountDO=result.AmountDO;
    dtobill.DetailOrder.Dish.IDDishh=result.IDDishh;

    dtobill.DetailOrder.Dish.NameD=result.NameD;
    dtobill.DetailOrder.Dish.IDCategory=result.IDCategory;
    dtobill.DetailOrder.Dish.DescriptionD=result.DescriptionD;
    dtobill.DetailOrder.Dish.ImgD=result.ImgD;
    dtobill.DetailOrder.Dish.PriceD=result.PriceD;

    dtobill.DetailOrder.Order.Customer.NamesC=result.NamesC;
    dtobill.DetailOrder.Order.Customer.LastNameC=result.LastNameC;
    dtobill.DetailOrder.Order.Customer.PhoneNumberC=result.PhoneNumberC;

    
   }
//#region Others

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
module.exports = { DataBill };