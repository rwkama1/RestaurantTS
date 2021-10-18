import DTOCategory from "../../shared/entity/DTOCategory";
import { Conection } from "../Conection";
import { VarChar } from "mssql";
import IDataCategory from "../interfaces/IDataCategory";
import { DataException } from "../../shared/exceptions/dataexception";

export class DataCategory implements IDataCategory{

    private static instancia: DataCategory;
    private constructor() { }
    public static getInstance(): DataCategory {
        if (!DataCategory.instancia) {
            DataCategory.instancia = new DataCategory();
        }

        return DataCategory.instancia;
    }
    registerCategory=async(dtocat:DTOCategory)=>
    {
      try {
        let queryinsert = "insert into Category values (@NameC,@DescriptionC)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NameC', VarChar, dtocat.name)
          .input('DescriptionC', VarChar, dtocat.description)
          
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateCategory=async(dtocat:DTOCategory)=>
    {
      try {
        let queryupdate = "Update Category Set DescriptionC=@DescriptionC where NameC=@NameC";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NameC', VarChar, dtocat.name)
          .input('DescriptionC', VarChar, dtocat.description)
          
        .query(queryupdate)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getCategories=async()=>
    {
      try {
          let queryget = "select * from Category"
          let pool = await Conection.conection();
          let arraycat=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtocat = new DTOCategory(x.NameC,x.DescriptionC);
              arraycat.push(dtocat);
           }
          pool.close();
          return arraycat;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
  
}