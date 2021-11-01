import DTOBill from "../../shared/entity/DTOBill";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataBill from "../interfaces/IDataBill";
import { VarChar,Money,Int } from "mssql";

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
        let queryinsert = "insert into Bill values (@SubtotalB,@TotalB,@VATB,@StateB,@IDOB)";
          let pool = await Conection.conection();
          const result = await pool.request()
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
    getBills=async()=>
    {
              //    IDB int NOT NULL PRIMARY KEY Identity(1,1),
//    SubtotalB money NOT NULL,
//    TotalB money NOT NULL,
//    VATB money NOT NULL,
//    StateB varchar(20) not null,
//    IDOB int not null Foreign Key References Orderr(IDO),
      try {
          let queryget = "select * from Bill"
          let pool = await Conection.conection();
          let arrayo:DTOBill[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let p of result.recordset) {
              let bill = new DTOBill(p.IDB,p.SubTotalB,
                p.TotalB,
                p.VATB,p.StateB,p.IDOB);
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