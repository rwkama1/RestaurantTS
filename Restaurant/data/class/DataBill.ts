import DTOBill from "../../shared/entity/DTOBill";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataBill from "../interfaces/IDataBill";
import { VarChar,Money,Int,Date } from "mssql";

export class DataBill implements IDataBill{

    private static instancia: DataBill;
    private constructor() { }
    public static getInstance(): DataBill {
        if (!DataBill.instancia) {
            DataBill.instancia = new DataBill();
        }

        return DataBill.instancia;
    }
    registerBill=async(dtobill:DTOBill)=>
    {
  
      try {
        let queryinsert = "insert into Bill values (@DateB,@SubtotalB,@TotalB,@VATB,@StateB,@IDOB)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('DateB', Date, dtobill.date)
          .input('SubtotalB', Money, dtobill.subtotal)
          .input('TotalB', Money, dtobill.totalb)
          .input('VATB', Money, dtobill.vat)
          .input('StateB', VarChar, dtobill.state)
          .input('IDOB', Int, dtobill.idorder)
          
          
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateState=async(dtobill:DTOBill)=>
    {
      try {
        let queryupdate = "Update Bill Set StateB=@StateB where IDB=@IDB";
       
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDB', Int, dtobill.idbill)
          .input('StateB', VarChar, dtobill.state)
        .query(queryupdate)
                
       
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getBills=async()=>
    {
      try {
          let queryget = "select * from Bill"
          let pool = await Conection.conection();
          let arrayo:DTOBill[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let p of result.recordset) {
              let bill = new DTOBill(p.IDB,p.SubTotalB,
                p.TotalB,
                p.VATB,p.StateB,p.IDOB,p.DateB);
              arrayo.push(bill);
           }
          pool.close();
          return arrayo;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}