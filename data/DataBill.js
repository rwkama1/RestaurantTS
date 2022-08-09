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
    static getPaymentMultipleId=async(arrayidpayment,orderby="IDPaymentt")=>
    {
             let array=[];
            let querysearch = `

            SELECT

            p.IDPaymentt,
            p.NumberReservation,
            p.IDCardPa,
            p.IDPassangerServicee,
            p.PassengerAmount,
            p.TotalRS as TotalPayment,
            p.Datee,
          
            rd.NumberRD,
            rd.Value,
            rd.NumberRoom,
          
            r.ReservationDate,
            r.ArrivalDate, 
            r.DepartureDate, 
            r.ProcessStatus, 
            r.ConfirmationStatus,
            r.Origin,
            r.Total as TotalReservation,
          
            dps.IDDPassangerService,
            dps.IDServicee,
            dps.Amount,
          
            ps.StartDate,
            ps.EndDate,
            ps.Total as TotalPS ,
            ps.Observations
            
            FROM 
            Payment as p INNER JOIN ReservationDetail rd
            ON p.NumberReservation=rd.NumberReservation
            INNER JOIN Reservation r ON r.NumberReservationn=rd.NumberReservation
            INNER JOIN DetailPassengerService dps ON dps.NumberPService=p.IDPassangerServicee
            INNER JOIN PassengerServicee ps ON ps.NumberPS=dps.NumberPService
            WHERE idpaymentt in
                (
                  ${
                    this.forinsidestring(arrayidpayment)
                    }
                )

                ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)        
             for (var precord of result.recordset) {
              let dtop  = new DTOPayment();
              this.getinformation(dtop,precord);
              array.push(dtop);
              
            }
           pool.close();
           return array;
      }
    static getSearchPayment=async(idpayment1=0,idpayment2=99999,
      numberr1=0,numberr2=99999,idpassengerservice1=0,
      idpassengerservice2=99999,idcardpassenger=""
      ,date1='2000-08-08',date2='2100-08-08',orderby="IDPaymentt"
      )=>
      {
              let array=[];
              let resultquery;
              let querysearch = `

                SELECT
  
                p.IDPaymentt,
                p.NumberReservation,
                p.IDCardPa,
                p.IDPassangerServicee,
                p.PassengerAmount,
                p.TotalRS as TotalPayment,
                p.Datee,
              
                rd.NumberRD,
                rd.Value,
                rd.NumberRoom,
              
                r.ReservationDate,
                r.ArrivalDate, 
                r.DepartureDate, 
                r.ProcessStatus, 
                r.ConfirmationStatus,
                r.Origin,
                r.Total as TotalReservation,
              
                dps.IDDPassangerService,
                dps.IDServicee,
                dps.Amount,
              
                ps.StartDate,
                ps.EndDate,
                ps.Total as TotalPS ,
                ps.Observations
                
                FROM 
                Payment as p INNER JOIN ReservationDetail rd
                ON p.NumberReservation=rd.NumberReservation
                INNER JOIN Reservation r ON r.NumberReservationn=rd.NumberReservation
                INNER JOIN DetailPassengerService dps ON dps.NumberPService=p.IDPassangerServicee
                INNER JOIN PassengerServicee ps ON ps.NumberPS=dps.NumberPService
                WHERE p.IDPaymentt between ${idpayment1} and ${idpayment2}
                and p.NumberReservation between ${numberr1} and ${numberr2}
                and p.IDPassangerServicee between ${idpassengerservice1} and ${idpassengerservice2}
                and p.IDCardPa like '%${idcardpassenger}%'
                and p.Datee between @date1 and @date2 

                order by ${orderby} desc
            
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('date1', Date, date1)
               .input('date2', Date, date2)
               .query(querysearch)
              resultquery = result.recordset[0].noexistpayment; 
              if (resultquery===undefined) {
                for (var precord of result.recordset) {
                  let dtop  = new DTOPayment();
                  this.getinformation(dtop,precord);
                  array.push(dtop);
                  
                }
                resultquery=array;
              }
              
             pool.close();
             return resultquery;
        
      
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