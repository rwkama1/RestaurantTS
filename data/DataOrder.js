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
          .input('DateO', DateTime, dtoorder.DateO)
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
    static updateSpecialRequirementsNumberPeople=async(idorder,speacilr,numberpeople)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE  IDOrder=@IDOrder)
            BEGIN
              select -1 as notexistorder
            END
          ELSE
          BEGIN
             UPDATE Orderr SET NumberPeople=@NumberPeople,
             SpecialRequirement=@SpecialRequirement
             WHERE IDOrder=@IDOrder
             select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection(); 
          const result = await pool.request()
          .input('IDOrder', Int,idorder)
          .input('NumberPeople', Int,numberpeople)
          .input('SpecialRequirement', VarChar,speacilr)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistorder;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static updateDateOOrder=async(idorder,dateo)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDOrder FROM Orderr WHERE  IDOrder=@IDOrder)
          BEGIN
            select -1 as notexistorder
          END
          ELSE
          BEGIN
            UPDATE Orderr SET DateO=@DateO
            WHERE IDOrder=@IDOrder
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDOrder', Int,idorder)
          .input('DateO', DateTime,dateo)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistorder;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].updatesuccess;

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
    static getDetailOrder=async(idorder,iddish)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDDetailO FROM DetailOrder WHERE IDOrder=@IDOrder AND IDDishh=@IDDishh )
            BEGIN
              select -1 as noexistdetailorder
            END
            ELSE
            BEGIN  
                    SELECT
                    o.*,

                    do.IDDetailO,
                    do.QuantityDO,
                    do.AmountDO,
                    do.IDDishh,

                    c.NamesC,
                    c.LastNameC,
                    c.PhoneNumberC

                    FROM Orderr o
                    INNER JOIN  DetailOrder do
                    ON do.idorder=o.idorder
                    INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer
                    WHERE do.idorder=@IDOrder and do.iddishh=@IDDishh
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
              .input('IDOrder', Int, idorder)
              .input('IDDishh', Int,iddish)
             .query(querysearch)
            resultquery = result.recordset[0].noexistdetailorder; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let detailorder = new DTOOrderDetail();
              this.getinformationOrderWithDetailOrder(detailorder, resultrecordset);
              resultquery=detailorder
            }
           pool.close();
           return resultquery;
      
    
     }
    //#endregion

    //#region GETS

    static getOrder=async(idorder)=>
    {
            let resultquery;
            let array=[];
            let querysearch = `

            IF NOT EXISTS ( SELECT IDOrder from Orderr WHERE IDOrder=@IDOrder)
            BEGIN
              select -1 as noexistorder
            END
            ELSE
            BEGIN  
                    SELECT
                    o.*,

                    do.IDDetailO,
                    do.QuantityDO,
                    do.AmountDO,
                    do.IDDishh,

                    c.NamesC,
                    c.LastNameC,
                    c.PhoneNumberC

                    FROM Orderr o
                    INNER JOIN  DetailOrder do
                    ON do.idorder=o.idorder
                    INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer
                    WHERE o.idorder=@IDOrder
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDOrder', Int, idorder)
             .query(querysearch)
             resultquery = result.recordset[0].noexistorder; 
             if (resultquery===undefined) {
              for (var r of result.recordset) {
                let orderdetail = new DTOOrderDetail();
                this.getinformationOrderWithDetailOrder(orderdetail,r);
                array.push(orderdetail);
                resultquery=array;
               } 
             }
           pool.close();
           return resultquery;
      
    
     }
    static getSearchOrder=async(idorder1=0,idorder2=99999,
      dateo1='2000-08-08',dateo2='2100-08-08'
      ,stateo="",specialr="",numberpeople1=0,numberpeople2=99999,
      IDCustomer1=0,IDCustomer2=99999,
      namecustomer="",lastnamecustomer="",
      QuantityDO1=0,QuantityDO2=99999,
      AmountDO1=0,AmountDO2=99999,
      IDDishh1=0,IDDishh2=99999,
      orderby="IDOrder")=>
          {
                   let array=[];
                  let querysearch = `
   	
                  SELECT
                  o.*,

                  do.IDDetailO,
                  do.QuantityDO,
                  do.AmountDO,
                  do.IDDishh,

                  c.NamesC,
                  c.LastNameC,
                  c.PhoneNumberC

                  FROM Orderr o
                  INNER JOIN  DetailOrder do
                  ON do.idorder=o.idorder
                  INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer

                  WHERE 
                   o.IDOrder between ${idorder1} and ${idorder2}
                  and o.DateO between @DateO1 and @DateO2
                  and o.StateO like '%${stateo}%'
                  and o.SpecialRequirement like '%${specialr}%'
                  and o.NumberPeople between ${numberpeople1} and ${numberpeople2}

                  and c.IDCustomer between ${IDCustomer1} and ${IDCustomer2}
                  and c.NamesC like '%${namecustomer}%'
                  and c.LastNameC like '%${lastnamecustomer}%'

                  and do.QuantityDO between ${QuantityDO1} and ${QuantityDO2}
                  and do.AmountDO between ${AmountDO1} and ${AmountDO2}
                  and do.IDDishh between ${IDDishh1} and ${IDDishh2}

                  ORDER BY ${orderby} desc
     
                  `
                  let pool = await Conection.conection();
                   const result = await pool.request()
                    .input('DateO1', DateTime, dateo1)
                    .input('DateO2', DateTime, dateo2)
                   .query(querysearch)        
                   for (var r of result.recordset) {
                    let detailorder = new DTOOrderDetail();
                    this.getinformationOrderWithDetailOrder(detailorder,r);
                    array.push(detailorder);
                   } 
                 pool.close();
                 return array;

             
          
      }
    static getMultipleIdOrder=async(arrayidorder,orderby="IDOrder")=>
            {
                    let array=[];
                    let querysearch = `
       
                    SELECT

                    o.*,
  
                    do.IDDetailO,
                    do.QuantityDO,
                    do.AmountDO,
                    do.IDDishh,
  
                    c.NamesC,
                    c.LastNameC,
                    c.PhoneNumberC
  
                    FROM Orderr o
                    INNER JOIN  DetailOrder do
                    ON do.idorder=o.idorder
                    INNER JOIN Customer c ON c.IDCustomer=o.IDCustomer
  
                    WHERE 
                    o.IDOrder in
                    (
                      ${this.forinsidestringorder(arrayidorder)}
                    ) 
                    ORDER BY ${orderby} desc
       
                    `
                    let pool = await Conection.conection();
                     const result = await pool.request()
                     .query(querysearch)        
                     for (var r of result.recordset) {
                      let detailorder = new DTOOrderDetail();
                      this.getinformationOrderWithDetailOrder(detailorder,r);
                      array.push(detailorder);
                     } 
                   pool.close();
                   return array;
  
               
            
        }
    //#endregion

   //#region GET INFORMATION

   static getinformationOrderWithDetailOrder(detailorder, result) {

    detailorder.Order.IDOrder=result.IDOrder;
    detailorder.Order.DateO=result.DateO;
    detailorder.Order.StateO=result.StateO;
    detailorder.Order.SpecialRequirement=result.SpecialRequirement;
    detailorder.Order.NumberPeople=result.NumberPeople;
   

    detailorder.IDDetailO=result.IDDetailO;
    detailorder.QuantityDO=result.QuantityDO;
    detailorder.AmountDO=result.AmountDO;
    detailorder.IDDishh=result.IDDishh;   
    detailorder.Dish=null;

    
    detailorder.Order.Customer.IDCustomer = result.IDCustomer;
    detailorder.Order.Customer.NamesC = result.NamesC;
    detailorder.Order.Customer.LastNameC = result.LastNameC;
    detailorder.Order.Customer.PhoneNumberC = result.PhoneNumberC;
   
    
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
   static forinsidestringorder(array)//pass all id to string for sql query
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const idorder = array[index];
      if (index===array.length-1) {
        stringelement=stringelement+idorder
      }
      else
      {
        stringelement=stringelement+idorder+","
      }
     
    }
    return stringelement
   
   }

   //#endregion
}
module.exports = { DataOrder };