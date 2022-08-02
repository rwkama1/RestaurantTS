const { VarChar,Int, Money, Date, DateTime } = require("mssql");
const { DTOOrder } = require("../DTO/DTOOrder");
const { DTOOrderDetail } = require("../DTO/DTOOrderDetail");
const { Conection } = require("./Conection");



class DataOrder
{
    //#region CRUD

    static registerOrderRestaurant=async(dtoorder,arrayorderdetail)=>
    {
          let resultquery;
          let queryinsert = `  

          IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
          BEGIN
            BEGIN TRANSACTION  

              insert into Customer values (@NameC,@LastNameC,@PhoneNumberC)

              insert into Orderr values (@DateO,'Confirmed',@SpecialRequirement,
              @NumberPeople,IDENT_CURRENT('Customer'))

              ${this.forAddDetailOrder(arrayorderdetail)}
              select 1 as insertwithcustomer
              IF(@@ERROR > 0)  
              BEGIN  
                  ROLLBACK TRANSACTION  
              END  
              ELSE  
              BEGIN  
              COMMIT TRANSACTION  
              END   
          END
          ELSE
          BEGIN
                  BEGIN TRANSACTION  

                  INSERT INTO  Orderr values (@DateO,'Confirmed',@SpecialRequirement,
                  @NumberPeople,@IDCustomer)

                  ${this.forAddDetailOrder(arrayorderdetail)}

                  select 2 as insertwithoutcustomer
                  
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
          .input('DateO', DateTime, dtoorder.DateO)
          .input('StateO', VarChar, dtoorder.StateO)
          .input('SpecialRequirement', VarChar, dtoorder.SpecialRequirement)
          .input('NumberPeople', Int, dtoorder.NumberPeople)
          .input('IDCustomer', Int, dtoorder.Customer.IDCustomer)
          .input('NameC', VarChar, dtoorder.Customer.NamesC)
          .input('LastNameC', VarChar, dtoorder.Customer.LastNameC)
          .input('PhoneNumberC', VarChar, dtoorder.Customer.PhoneNumberC)
          .query(queryinsert)
          resultquery = result.recordset[0].insertwithcustomer;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertwithoutcustomer;
          }
          pool.close();
          return resultquery;
  
    }
    static registerOnlineOrder=async(dtoorder,arrayorderdetail)=>
    {
    
          let queryinsert = `  

              BEGIN TRANSACTION  

              INSERT INTO Customer values (@NameC,@LastNameC,@PhoneNumberC)

              INSERT INTO Orderr values (@DateO,'Pending',@SpecialRequirement,
              @NumberPeople,IDENT_CURRENT('Customer'))

              ${this.forAddDetailOrder(arrayorderdetail)}
              
              IF(@@ERROR > 0)  
              BEGIN  
                  ROLLBACK TRANSACTION  
              END  
              ELSE  
              BEGIN  
                  COMMIT TRANSACTION  
              END   
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('DateO', Date, dtoorder.DateO)
          .input('SpecialRequirement', VarChar, dtoorder.SpecialRequirement)
          .input('NumberPeople', Int, dtoorder.NumberPeople)
          .input('NameC', VarChar, dtoorder.Customer.NamesC)
          .input('LastNameC', VarChar, dtoorder.Customer.LastNameC)
          .input('PhoneNumberC', VarChar, dtoorder.Customer.PhoneNumberC)
          .query(queryinsert)
       
          pool.close();
          return true;
  
    }
    static cancelOrder=async(idorder)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE  IDOrder=@IDOrder)
            BEGIN
              select -1 as notexistorder
            END
          ELSE
          BEGIN
             UPDATE Orderr SET StateO='Canceled'
             WHERE IDOrder=@IDOrder
             select 1 as canceledsuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDOrder', Int,idorder)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistorder;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].canceledsuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static confirmOrder=async(idorder)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE  IDOrder=@IDOrder)
            BEGIN
              select -1 as notexistorder
            END
          ELSE
          BEGIN
             UPDATE Orderr SET StateO='Confirmed'
             WHERE IDOrder=@IDOrder
             select 1 as canceledsuccess
          END

          `;
          let pool = await Conection.conection(); 
          const result = await pool.request()
          .input('IDOrder', Int,idorder)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistorder;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].canceledsuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static updateDepartureDateReservation=async(numberreservation,enddate)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
          BEGIN
            select -1 as notexistreservation
          END
          ELSE
          BEGIN   
              IF  EXISTS ( SELECT * FROM Reservation WHERE arrivaldate>=@DepartureDate and NumberReservationn=@NumberReservation)
              BEGIN
                select -2 as dateincorrect
              END
              ELSE
              BEGIN 
                  UPDATE Reservation SET DepartureDate=@DepartureDate
                  WHERE NumberReservationn=@NumberReservation
                  select 1 as confirmsuccess
              END
             
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberReservation', Int,numberreservation)
          .input('DepartureDate', Date,enddate)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistreservation;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].dateincorrect;
            if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].confirmsuccess;
              }
             
          }
          pool.close();
          return resultquery;
       
    }
    // DETAIL ORDER

    static addDetailOrder=async(idorder,quantity,iddish)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE IDOrder=@IDOrder)
          BEGIN
            select -1 as notexistorder
          END
          ELSE
          BEGIN        
              IF NOT EXISTS ( SELECT IDDishh FROM Dish WHERE IDDishh=@IDDishh)
              BEGIN
                select -2 as notexistdish
              END
              ELSE
              BEGIN
                  INSERT INTO  DetailOrder
                  SELECT @QuantityDO,@QuantityDO*CostD,IDOrder,IDDishh
                  FROM dish,orderr			 
                  WHERE IDDishh=@IDDishh AND IDOrder=@IDOrder

                  select 1 as insertsuccess  
              END         
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDOrder', Int, idorder)
          .input('IDDishh', Int,iddish)
          .input('QuantityDO', Money,quantity)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistorder;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].notexistdish;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].insertsuccess;       
            }

              
          }
          pool.close();
          return resultquery;
       
    }
    static removeDetailOrder=async(idorder,iddish)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM DetailOrder WHERE IDOrder=@IDOrder AND IDDishh=@IDDishh )
          BEGIN
            select -1 as noexistdetailorder
          END
          ELSE
          BEGIN        
                  DELETE FROM DetailOrder WHERE  IDOrder=@IDOrder AND IDDishh=@IDDishh 
                  select 1 as deletesucess  
          END

          `;

          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDOrder', Int, idorder)
          .input('IDDishh', Int,iddish)
       
          .query(queryupdate)
          
            resultquery = result.recordset[0].noexistdetailorder;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].deletesucess;       
            }

              
         
          pool.close();
          return resultquery;
       
    }
    static updateDetailOrderQuantity=async(idorder,iddish,quantity)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDDetailO FROM DetailOrder WHERE IDOrder=@IDOrder AND IDDishh=@IDDishh )
          BEGIN
            select -1 as noexistdetailorder
          END
          ELSE
          BEGIN    
        
                UPDATE DetailOrder set QuantityDO=@QuantityDO,AmountDO=CostD*@QuantityDO
                FROM DetailOrder,Dish
                WHERE DetailOrder.IDOrder=@IDOrder and DetailOrder.IDDishh=@IDDishh
                select 1 as updatesuccess
                
          END
          `;

          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDOrder', Int, idorder)
          .input('IDDishh', Int,iddish)
          .input('QuantityDO', Int,quantity)
       
          .query(queryupdate)
          
            resultquery = result.recordset[0].noexistdetailorder;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].updatesuccess;       
            }
          pool.close();
          return resultquery;
       
    } 

    //#endregion

    //#region GETS

    static getReservation=async(numberreservation)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Reservation WHERE NumberReservationn=@NumberReservationn)
            BEGIN
              select -1 as notexistreservation
            END
            ELSE
            BEGIN
                SELECT * FROM Reservation inner join Passenger
                on Reservation.IDCardPassengerr=Passenger.IDCard
                WHERE NumberReservationn=@NumberReservationn
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('NumberReservationn', Int, numberreservation)
             .query(querysearch)
            resultquery = result.recordset[0].notexistreservation; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let resr = new DTOReservation();
              this.getinformationReservation(resr, resultrecordset);
              resultquery=resr
            }
           pool.close();
           return resultquery;
      
    
     }

    static getSearchReservations=async(valueroom1=0,valueroom2=9999,
      numberroom1=0,numberroom2=9999
      ,numberres1=0,numberres2=0,
      processstatus="",origin="",total1=0,total2=99999,idpassenger=""
      ,departdate1='2000-08-08',departdate2='2100-08-08',
      arrdate1='2000-08-08',arrdate2='2100-08-08',
      reservdate1='2000-08-08',reservdate2='2100-08-08',
      orderby="NumberReservationn")=>
          {
                   let array=[];
                  let querysearch = `
   	
                  SELECT 
                  Reservation.*,
                  ReservationDetail.NumberRD,
                  ReservationDetail.NumberReservation,
                  ReservationDetail.NumberRoom,
                  Room.*
                  FROM ReservationDetail 
                  INNER JOIN Room
                  on Room.NumberRoomm=ReservationDetail.NumberRoom
                  INNER JOIN Reservation on Reservation.NumberReservationn=ReservationDetail.NumberReservation
                  WHERE NumberReservationn between ${numberres1} and ${numberres2}
                  and ReservationDate between @reservdate1 and @reservdate2
                  and ArrivalDate between @arrdate1 and @arrdate2 
                  and DepartureDate between  @departdate1  and @departdate2 
                  and ProcessStatus like '%${processstatus}%'
                  and Origin like '%${origin}%'
                  and Total between ${total1} and ${total2}
                  and IDCardPassengerr like '%${idpassenger}%'
                  and ReservationDetail.Value between ${valueroom1} and ${valueroom2}
                  and ReservationDetail.NumberRoom between ${numberroom1} and ${numberroom2}
                  ORDER BY ${orderby} desc
     
                  `
                  let pool = await Conection.conection();
                   const result = await pool.request()
                   .input('reservdate1', Date, reservdate1)
                    .input('reservdate2', Date, reservdate2)
                    .input('arrdate1', Date, arrdate1)
                    .input('arrdate2', Date, arrdate2)
                    .input('departdate1', Date, departdate1)
                    .input('departdate2', Date, departdate2)
                   .query(querysearch)        
                   for (var r of result.recordset) {
                    let detailreservation = new DTOReservationDetail();
                    this.getinformationDetailReservation(detailreservation,r);
                    array.push(detailreservation);
                   } 
                 pool.close();
                 return array;
            
          
           }
    //#endregion

   //#region GET INFORMATION

   static getinformationReservation(reservation, result) {


    reservation.NumberReservationn=result.NumberReservationn;
    reservation.ReservationDate=result.ReservationDate;
    reservation.ArrivalDate=result.ArrivalDate;
    reservation.DepartureDate=result.DepartureDate;
    reservation.ProcessStatus=result.ProcessStatus;
    reservation.ConfirmationStatus=result.ConfirmationStatus;
    reservation.Origin=result.Origin;
    reservation.Total=result.Total;
    
    
   }
   
   static getinformationDetailOrder(detailorder, result) {

    detailorder.Total=result.Total;
    detailorder.Value=result.Value;
    detailorder.Dish=null;
    detailorder.Order=null;

    detailorder.NameD=result.NameD
    detailorder.IDCategory=result.IDCategory
    detailorder.DescriptionD=result.DescriptionD
    detailorder.ImgD=result.ImgD
    detailorder.PriceD=result.PriceD
    detailorder.CostD=result.CostD
    detailorder.QuantityAD=result.QuantityAD

  

   }
   static getinformationDetailReservation(detailreservation, result) {

    detailreservation.NumberRD=result.NumberRD;
    DataReservation.getinformationReservation(detailreservation.Reservation,result)
    DataRoom.getinformation(detailreservation.Room,result)

   }

   //#region OTHERS

 
   static forAddDetailOrder(array)//used to add multiple detail order
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];

        stringelement=stringelement+
       `
        insert into DetailOrder values (${element.quantity},${element.amount},IDENT_CURRENT('Orderr'),${element.iddish})

        `
      
     
    }
    return stringelement
   
   }
  
   //#endregion
}
module.exports = { DataOrder };