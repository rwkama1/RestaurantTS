import { Conection } from "../Conection";
import IDataOrder from "../interfaces/IDataOrder";
import { VarChar,Int,Money,DateTime } from "mssql";
import { DataException } from "../../shared/exceptions/dataexception";
import DTODeatilOrder from "../../shared/entity/DTODetailOrder";
import DTOOrder from "../../shared/entity/DTOOrder";

export class DataOrder implements IDataOrder{

    private static instancia: DataOrder;
    private constructor() { }
    public static getInstance(): DataOrder {
        if (!DataOrder.instancia) {
            DataOrder.instancia = new DataOrder();
        }

        return DataOrder.instancia;
    }
    registerOrder=async(dtoorder:DTOOrder)=>
    {
      try {
        let queryinsert = "insert into Orderr values (@IDO,@DateO,@StateO,@SpecialRequirement,@NumberPeople,@IDCustomer)";
        let queryinsert2 = "insert into DetailOrder values (@IDDO,@QuantityDO,@AmountDO,@IDO,@IDDish)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDO', Int, dtoorder.idorder)
          .input('DateO', DateTime, dtoorder.dateorder)
          .input('StateO', VarChar, dtoorder.stateorder)
          .input('SpecialRequirement', VarChar, dtoorder.specialrequirements)
          .input('NumberPeople', Int, dtoorder.numberpeople)
          .input('IDCustomer', Int, dtoorder.idcustomer)
         
        .query(queryinsert)
                
          for(let detailo of dtoorder.detailorders)
          {
            const result2 = await pool.request()
            .input('IDDO', Int, detailo.iddetailorder)
            .input('QuantityDO', Int, detailo.quantitydo)
            .input('AmountDO', Money, detailo.amountdo)
            .input('IDO', Int, dtoorder.idorder)
            .input('IDDish', Int, detailo.iddish)
            .query(queryinsert2)
          }
          pool.close();    
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateOrder=async(dtoorder:DTOOrder)=>
    {
      try {
        let queryupdate = "Update Orderr Set DateO=@DateO,StateO=@StateO,SpecialRequirement=@SpecialRequirement,NumberPeople=@NumberPeople,IDCustomer=@IDCustomer where IDO=@IDO";
        let queryupdate2 = "Update DetailOrder Set QuantityDO=@QuantityDO,AmountDO=@AmountDO,IDDish=@IDDish where IDO=@IDO and IDDO=@IDDO";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDO', Int, dtoorder.idorder)
          .input('DateO', DateTime, dtoorder.dateorder)
          .input('StateO', VarChar, dtoorder.stateorder)
          .input('SpecialRequirement', VarChar, dtoorder.specialrequirements)
          .input('NumberPeople', Int, dtoorder.numberpeople)
          .input('IDCustomer', Int, dtoorder.idcustomer)
         
        .query(queryupdate)
                
          for(let detailo of dtoorder.detailorders)
          {
            const result2 = await pool.request()
            .input('IDDO', Int, detailo.iddetailorder)
            .input('QuantityDO', Int, detailo.quantitydo)
            .input('AmountDO', Money, detailo.amountdo)
            .input('IDO', Int, dtoorder.idorder)
            .input('IDDish', Int, detailo.iddish)
            .query(queryupdate2)
          }
          pool.close();    
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
     getOrders=async()=>
    {
      try {
          let queryget = "select * from Orderr"
          let pool = await Conection.conection();
          let arrayo:DTOOrder[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let order = new DTOOrder(x.IDO,x.DateO,x.StateO,x.SpecialRequirement
                ,x.NumberPeople,x.IDCustomer,await this.getDeailOrders(x.IDO));
              arrayo.push(order);
           }
          pool.close();
          return arrayo;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     //********************* DETAIL ORDER ************** */

     registerDetailOrder=async(dtoorder:DTOOrder)=>
    {
      try {
        let lengthdo=dtoorder.detailorders.length;
        let queryinsert = "insert into DetailOrder values (@IDDO,@QuantityDO,@AmountDO,@IDO,@IDDish)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDDO', Int, dtoorder.detailorders[lengthdo-1].iddetailorder)
            .input('QuantityDO', Int, dtoorder.detailorders[lengthdo-1].quantitydo)
            .input('AmountDO', Money,  dtoorder.detailorders[lengthdo-1].amountdo)
            .input('IDO', Int, dtoorder.idorder)
            .input('IDDish', Int, dtoorder.detailorders[lengthdo-1].iddish) 
        .query(queryinsert)
          pool.close();    
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
        }
     deleteDetailOrder=async(dtoorder:DTOOrder)=>
        {
        try {
            let quarydelete = "DELETE FROM DetailOrder WHERE IDO=@IDO";
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDO', Int, dtoorder.idorder)
            .query(quarydelete)
            pool.close();    
            return true;
            
        }
        catch(e)
        {
            throw new DataException("DataLayer Error: "+e.message)
        }
    
        }
     getDeailOrders=async(idorder:number)=>
    {
      try {
          let queryget = "select * from DetailOrder where IDO=@IDO";
          let pool = await Conection.conection();
          let arraydo:DTODeatilOrder[]=[];
          const result = await pool.request()
          .input('IDO', Int, idorder)
          .query(queryget)
          for (let x of result.recordset) {
              let detailo = new DTODeatilOrder(x.IDDO,x.QuantityDO,x.AmountDO,x.IDDish);
              arraydo.push(detailo);
           }
          pool.close();
          return arraydo;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}