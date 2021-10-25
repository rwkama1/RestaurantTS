
import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";
import ITableCustomerController from "../../interfaces/ITableCustomerController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCUTableCustomer } from "./maintenance/LCUTableCustomer";
import { LGetTableCustomer } from "./maintenance/LGetTableCustomer";

export class TableCustomerController implements ITableCustomerController
{

    private static instancia: TableCustomerController;
    private constructor() { }
    public static getInstance(): TableCustomerController {
        if (!TableCustomerController.instancia) {
            TableCustomerController.instancia = new TableCustomerController();
        }

        return TableCustomerController.instancia;
    }
    //********************** ADD WITHOUT PREVIOUS RESERVATION ******** */

    registerCustomer=async(dtc:DTOCustomer)=>
    {
        let addc=await LCUTableCustomer.getInstance().registerCustomer(dtc);
        return addc
        
    }  

  //********************** ADD WITH PREVIOUS RESERVATION ************ */

    listCustomers=async()=>
    {
        let tlc=await LCUTableCustomer.getInstance().listCustomers();
        return tlc
       
    }
    getCustomerbyExpresion=async(exp:string)=>
    {
        let tlc=await LCUTableCustomer.getInstance().getCustomerbyExpresion(exp);
        return tlc
       
    }  
    enterCustomer=async(id:number)=>
    {
        let tlc=await LCUTableCustomer.getInstance().enterCustomer(id);
        return tlc
       
    }  
    listAvailableTable=async()=>
    {
        let tlc=await LCUTableCustomer.getInstance().listAvailableTable();
        return tlc
       
    }
    enterTable=async(id:number)=>
    {
        let tlc=await LCUTableCustomer.getInstance().enterTable(id);
        return tlc
       
    }  
    registerTableCustomer=async()=>
    {
        let tlc=await LCUTableCustomer.getInstance().registerTableCustomer();
        return tlc 
    }  
   
  //************************** DELETE  ****************************** */

   getLTCSortbyCustomer=async()=>
  {
    let tlc=await LCUTableCustomer.getInstance().getLTCSortbyCustomer();
    return tlc 
   
  } 
   selectTableCustomer=async(id:number)=>
  {
    let tlc=await LCUTableCustomer.getInstance().selectTableCustomer(id);
    return tlc 
  } 
   deleteTableCustomer=async()=>
  {
    let tlc=await LCUTableCustomer.getInstance().deleteTableCustomer();
    return tlc 
   } 

   //********************* GETS ***************************************** */

    getLTableC=async(id:number)=>
    {
        let gettlc=await LGetTableCustomer.getLTableC(id);
        if(gettlc===null)
        {
        throw new LogicException("The Table Customer does not exists in the system");      
        }
        return gettlc.getDTO() 
    }
   
    getLTCbyCustomer=async(name:string,lastname:string)=>
   {
        let gettlc=await LGetTableCustomer.getLTCbyCustomer(name,lastname);
        if(gettlc===null)
        {
        throw new LogicException("The Customer has not Table");      
        }
        return gettlc.getDTO()
   }
   
    getLTCbyTable=async(id:number)=>
   {
        let gettlc=await LGetTableCustomer.getLTCbyTable(id);
        if(gettlc===null)
        {
        throw new LogicException("The Table is available");      
        }
        return gettlc.getDTO()
   }
 
  

    getLSortbyCustomer=async()=>
   {
    let gettlc=await LGetTableCustomer.getLSortbyCustomer();
    let arraydto=InstanceArrayDTO.instanceArrayTableCustomer(gettlc);
    return arraydto
   } 
    getLSortbyTable=async()=>
   {
    let gettlc=await LGetTableCustomer.getLSortbyTable();
    let arraydto=InstanceArrayDTO.instanceArrayTableCustomer(gettlc);
    return arraydto
   } 
    getLTablesCustomers=async()=>
   {
    let gettlc=await LGetTableCustomer.getLTablesCustomers();
    let arraydto=InstanceArrayDTO.instanceArrayTableCustomer(gettlc.arraytc);
    return arraydto
   }

}