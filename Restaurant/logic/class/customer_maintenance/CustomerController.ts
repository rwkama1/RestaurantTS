import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";
import ICustomerController from "../../interfaces/ICustomerController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCustomerAutentication } from "./maintenance/LAutentication";
import { LCUCustomer } from "./maintenance/LCUCustomer";
import { LGetCustomer } from "./maintenance/LGetsCustomer";

export class CustomerController implements ICustomerController{

    private static instancia: CustomerController;
    private constructor() { }
    public static getInstance(): CustomerController {
        if (!CustomerController.instancia) {
            CustomerController.instancia = new CustomerController();
        }

        return CustomerController.instancia;
    }
    
    //************ MAINTENANCE ********************** */

    listCustomers=async()=>
    {
        let customers= await LCUCustomer.getInstance().listCustomers();
        return customers
    }
    getCustomersbyName=async(name:string,lastname:string)=>
    {
       let customer= await LCUCustomer.getInstance().getCustomersbyName(name,lastname);
      return customer
        
    }
    selectCustomer=async(idcard:string)=>
    {
        let customer= await LCUCustomer.getInstance().selectCustomer(idcard);
      return customer
        
    }
    updateCustomer=async(dtc:DTOCustomer)=>
     {
        let customer= await LCUCustomer.getInstance().updateCustomer(dtc);
       return customer
  
     }
    registerCustomer=async(dtc:DTOCustomer)=>
         {
          
        let customer= await LCUCustomer.getInstance().registerCustomer(dtc);
        return customer
  
         }
    
   //***************** GET CUSTOMERS ***************** */

    getLSortCustomers=async()=>
   {
    const getcustomers= await LGetCustomer.getLSortCustomers();
    let arraydto=InstanceArrayDTO.instanceArrayCustomer(getcustomers);
    return arraydto
   
     }
    getLCustomer=async(idcard:string)=>
     {
        const getcustomer= await LGetCustomer.getLCustomer(idcard);
        if(getcustomer===null)
        {
            throw new LogicException("The Customer does not exists in the system");
            
        }
        return getcustomer.getDTO()
     }
    getLCustomerbyName=async(name:string,lastname:string)=>
     {
        const getcustomer= await LGetCustomer.getLCustomerbyName(name,lastname);
        if(getcustomer===null)
        {
            throw new LogicException("The Customer does not exists in the system");
            
        }
        return getcustomer.getDTO()
     }
    getLCustomers=async()=>
     {
        const getcustomers= await LGetCustomer.getLCustomers();
        let arraydto=InstanceArrayDTO.instanceArrayCustomer(getcustomers.arraycustomer);
        return arraydto
     }
     
   //******************* AUTENTICATION *********************** */

    loginCustomer=async(idcard:string,password:string)=>
   {  
    const lcustomer=await LCustomerAutentication.getInstance().loginCustomer(idcard,password);
    return lcustomer.getDTO()
   }
    getloginCustomer=()=>
   {
  
    const getloginc= LCustomerAutentication.getInstance().customerlogin;
    if(getloginc===null)
    {
        throw new LogicException("There is no customer logged in");
        
    }
    return getloginc.getDTO()
    
   }
    logout=()=>
   {
    const logout= LCustomerAutentication.getInstance().logout();
    return logout
   }
}