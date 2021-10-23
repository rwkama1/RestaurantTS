import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";
import ICustomerController from "../../interfaces/ICustomerController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
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
    
    //************ REGISTER ********************** */

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
    getLCustomer=async(id:number)=>
     {
        const getcustomer= await LGetCustomer.getLCustomer(id);
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
     
   
}