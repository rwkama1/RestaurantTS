import { VarChar } from "mssql";
import DTOUser from "../../shared/entity/DTOUser";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataUsers from "../interfaces/IDataUser";

export default class DataUser implements IDataUsers {
    
    private static instancia: DataUser;
    private constructor() { }
    public static getInstance(): DataUser {
        if (!DataUser.instancia) {
            DataUser.instancia = new DataUser();
        }

        return DataUser.instancia;
    }
    
    registerUser=async(dtuser:DTOUser)=>
    {
      try {
          let queryinsert = "insert into Users values (@IDCardU,@NamesUserU,@CityU,@TypeUserU,@Hashh,@PasswordUserU)"
          let pool = await Conection.conection();
        //   let sqltools=Conection.sqlserver();
          const result = await pool.request()
              .input('IDCardU',VarChar, dtuser.idcard)
              .input('NamesUserU', VarChar, dtuser.name)
              .input('CityU', VarChar, dtuser.city)
              .input('TypeUserU', VarChar, dtuser.typeuserr)
              .input('PasswordUserU', VarChar, dtuser.password)
              .input('Hashh', VarChar, dtuser.hashh)
              .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateUser=async(dtuser:DTOUser)=>
    {
      try {
          let queryupdate = "Update Users Set NamesUserU=@NamesUserU,CityU=@CityU,TypeUserU=@TypeUserU,HashhU=@Hashh,PasswordUserU=@PasswordUserU where IDCardU=@IDCardU";
          let pool = await Conection.conection();
        
          const result = await pool.request()
          .input('IDCardU',VarChar, dtuser.idcard)
          .input('NamesUserU', VarChar, dtuser.name)
          .input('CityU', VarChar, dtuser.city)
          .input('TypeUserU', VarChar, dtuser.typeuserr)
          .input('PasswordUserU', VarChar, dtuser.password)
          .input('Hashh', VarChar, dtuser.hashh)
          .query(queryupdate) 
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    deleteUser=async(dtuser:DTOUser)=>
    {
      try {
          let qdelete = "DELETE FROM Users where IDCardU=@IDCardU";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCardU',VarChar, dtuser.idcard)
          .query(qdelete) 
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getUsers=async()=>
    {
      try {
          let queryget = "select * from Users"
          let pool = await Conection.conection();
          let arrayu=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let user = new DTOUser(x.IDCardU,x.NamesUserU,x.CityU,
                x.TypeUserU,x.HashhU,x.PasswordUserU);
              arrayu.push(user);
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