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
        let queryinsert = "insert into Customer values (@IDCard,@Names,@LastName,@Town,@Addresss,@PhoneNumber,@Mail,@Salt,@Passwordd)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, dtc.idcard)
          .input('Names', VarChar, dtc.name)
          .input('LastName', VarChar, dtc.lastname)
          .input('Town',VarChar, dtc.town)
          .input('Addresss', VarChar, dtc.address)
          .input('PhoneNumber', VarChar, dtc.phonenumber)
          .input('Mail', VarChar, dtc.mail)
          .input('Salt', VarChar, dtc.salt)
          .input('Passwordd', VarChar, dtc.passwordd)
        .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateCustomer=async(dtc:DTOCustomer)=>
    {
      try {
          let queryupdate = "Update Customer Set NamesC=@Names,LastNameC=@LastName,TownC=@Town,AddressC=@Addresss,PhoneNumberC=@PhoneNumber,MailC=@Mail,SaltC=@Salt,PassworddC=@Passwordd where IDCardC=@IDCard";
          let pool = await Conection.conection();
        
          const result = await pool.request()
          .input('IDCard', VarChar, dtc.idcard)
          .input('Names', VarChar, dtc.name)
          .input('LastName', VarChar, dtc.lastname)
          .input('Town',VarChar, dtc.town)
          .input('Addresss', VarChar, dtc.address)
          .input('PhoneNumber', VarChar, dtc.phonenumber)
          .input('Mail', VarChar, dtc.mail)
          .input('Salt', VarChar, dtc.salt)
          .input('Passwordd', VarChar, dtc.passwordd)
          .query(queryupdate) 
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
              let cust = new DTOCustomer(x.IDCardC,x.NamesC,x.LastNameC,x.TownC,
                x.AddressC,x.PhoneNumberC,x.MailC,x.SaltC,x.PassworddC);
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