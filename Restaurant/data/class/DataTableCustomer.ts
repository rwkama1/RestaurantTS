import IDataTableCustomer from "../interfaces/IDataTableCustomer";

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
    registerTableCustomer=async()=>
    {
      try {
        let queryinsert = "insert into TablesR values ('Available')";
          let pool = await Conection.conection();
          const result = await pool.request()
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    changeState=async(dtot:DTOTable)=>
    {
      try {
        let queryupdate = "Update TablesR Set StateT=@StateT where IDT=@IDT";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDT', Int, dtot.IDT)
          .input('StateT', VarChar,dtot.StateT)
        .query(queryupdate)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getTables=async()=>
    {
      try {
          let queryget = "select * from TablesR"
          let pool = await Conection.conection();
          let arraytables:DTOTable[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtot = new DTOTable(x.IDT,x.StateT);
              arraytables.push(dtot);
           }
          pool.close();
          return arraytables;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     
}