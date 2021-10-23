import DTOCustomer from "../../shared/entity/DTOCustomer";
import { Conection } from "../Conection";
import { VarChar } from "mssql";
import IDataCustomer from "../interfaces/IDataCustomer";
import { DataException } from "../../shared/exceptions/dataexception";

export default class DataCustomer implements IDataCustomer {
    
    private static instancia: DataCustomer;
    private constructor() { }
    public static getInstance(): DataCustomer {
        if (!DataCustomer.instancia) {
            DataCustomer.instancia = new DataCustomer();
        }

        return DataCustomer.instancia;
    }
    
    registerCustomer=async(dtc:DTOCustomer)=>
    {
      try {
        let queryinsert = "insert into Customer values (@Names,@LastName)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('Names', VarChar, dtc.name)
          .input('LastName', VarChar, dtc.lastname)
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
   
    getCustomers=async()=>
    {
      try {
          let queryget = "select * from Customer"
          let pool = await Conection.conection();
          let arrayu=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let cust = new DTOCustomer(x.IDCustomer,x.NamesC,x.LastNameC);
              arrayu.push(cust);
           }
          pool.close();
          return arrayu;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
  
}