import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicCustomer from "../../business_class/LCustomer";
import HashPassword from "../../encrypt/hashPassword";
import { LGetCustomer } from "./LGetsCustomer";

export class LCustomerAutentication
{
    private static instancia: LCustomerAutentication;
    private constructor() { }
    public static getInstance(): LCustomerAutentication {
        if (!LCustomerAutentication.instancia) {
            LCustomerAutentication.instancia = new LCustomerAutentication();
        }

        return LCustomerAutentication.instancia;
    }
    
    private _customerlogin: LogicCustomer;
    public get customerlogin(): LogicCustomer {
        return this._customerlogin;
    }
    public set customerlogin(value: LogicCustomer) {
        this._customerlogin = value;
    }
  
     loginCustomer=async(idcard:string,password:string)=>
    {
        let customersearch = await LGetCustomer.getLCustomer(idcard);
        if(customersearch===null)
        {
            throw new LogicException("That Customer does not exists in the system");

        }
        const verifyp=await HashPassword.verifyPassword(password,customersearch.passwordd,customersearch.salt);
   
        if(verifyp===false)
        {
            throw new LogicException("Wrong password");
        }
   
       this.customerlogin=customersearch;
       return this.customerlogin;
    }
     logout()
    {
        let lcustomer=this.customerlogin;
        if(lcustomer!=null)
        {
            this.customerlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }
    
}