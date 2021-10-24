import IDataTableCustomer from "../interfaces/IDataTableCustomer";
import { Int } from "mssql";
import { Conection } from "../Conection";
import DTOTableCustomer from "../../shared/entity/DTOTableCustomer";
import { DataException } from "../../shared/exceptions/dataexception";

export class DataTableCustomer implements IDataTableCustomer
{
      
    private static instancia: DataTableCustomer;
    private constructor() { }
    public static getInstance(): DataTableCustomer {
        if (!DataTableCustomer.instancia) {
            DataTableCustomer.instancia = new DataTableCustomer();
        }

        return DataTableCustomer.instancia;
    }
    registerTableCustomer=async(dtotc:DTOTableCustomer)=>
    {
      try {
        let queryinsert = "insert into Table_Customer values (@IDT,@IDCustomer)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDT', Int,dtotc.idtable)
          .input('IDCustomer', Int,dtotc.idcustomer)
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    deleteTableCustomer=async(dtotc:DTOTableCustomer)=>
    {
      try {
        let quarydelete = "DELETE FROM Table_Customer WHERE IDT=@IDT and IDCustomer=@IDCustomer";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDT', Int, dtotc.idtable)
          .input('IDCustomer', Int,dtotc.idcustomer)
        .query(quarydelete)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getTableCustomer=async()=>
    {
      try {
          let queryget = "select * from Table_Customer"
          let pool = await Conection.conection();
          let arraytc:DTOTableCustomer[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtotc = new DTOTableCustomer(x.IDTC,x.IDT,x.IDCustomer);
              arraytc.push(dtotc);
           }
          pool.close();
          return arraytc;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     
}