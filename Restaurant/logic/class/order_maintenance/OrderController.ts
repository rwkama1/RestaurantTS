
import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IOrderController from "../../interfaces/IOrderController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCUDetailOrder } from "./maintenance/LCUDetailOrder";
import { LCUOrders } from "./maintenance/LCUOrders";
import { LGetOrders } from "./maintenance/LGetOrders";

export class OrderController implements IOrderController{

    private static instancia: OrderController;
    private constructor() { }
    public static getInstance(): OrderController {
        if (!OrderController.instancia) {
            OrderController.instancia = new OrderController();
        }

        return OrderController.instancia;
    }
    //***************** REGISTER ***************** */

    //*** ONLINE ************* */
    
    registerCustomer=async(dtc:DTOCustomer)=>
    {
        let addc=await LCUOrders.getInstance().registerCustomer(dtc);
        return addc
        
    } 
    //*** RESTAURANT ********* */

    getCustomerbyExpresionName=async(exp:string)=>
    {
        let addorder=await LCUOrders.getInstance().getCustomerbyExpresionName(exp);
        return addorder
    } 
    enterCustomer=async(id:number)=>
    {      
        let addorder=await LCUOrders.getInstance().enterCustomer(id);
        return addorder
       
    }   
    listDishes=async()=>
    {
        let addorder=await LCUOrders.getInstance().listDishes();
        return addorder  
    }
    registerDOrder=async(id:number,quantity:number)=>
    {
        let addorder=await LCUOrders.getInstance().registerDOrder(id,quantity);
        return addorder 
    }
    removeDOrder=async(id:number)=>
    {
        let addorder=await LCUOrders.getInstance().removeDOrder(id);
        return addorder 
    }
    calculateTotal=()=>
    {
        let addorder= LCUOrders.getInstance().calculateTotal();
        return addorder 
    }
    closeOrder=(date:Date,pspecialr:string,pnpeople:number)=>
    {
        let addorder= LCUOrders.getInstance().closeOrder(date,pspecialr,pnpeople);
        return addorder 

    }
    saveOrder=async()=>
    {
        let addorder= await  LCUOrders.getInstance().saveOrder();
        return addorder 
    }
    
    //******************* UPDATE ****************** */

    listOrdersCustomer=async(name:string)=>
    {
        let updateorder= await  LCUOrders.getInstance().listOrdersCustomer(name);
        return updateorder 
    }
    selectOrder=async(id:number)=>
    {
       let updateorder= await  LCUOrders.getInstance().selectOrder(id);
       return updateorder 
    }
    updateCustomer=async(id:number)=>
    {
        let updateorder= await  LCUOrders.getInstance().updateCustomer(id);
        return updateorder 
    }
    updateData=(date:Date,pspecialr:string,pnpeople:number)=>
    {
        let updateorder= LCUOrders.getInstance().updateData(date,pspecialr,pnpeople);
        return updateorder

    }
    updateOrder=async()=>
    {
        let updateorder= await LCUOrders.getInstance().updateOrder();
        return updateorder
    }
    //****** CHANGE STATE *******/

    updateState=async(state:string)=>
    {
        let updateorder=await  LCUOrders.getInstance().updateState(state);
        return updateorder
    }


    //***********************************  DETAIL ORDER ***************************************** */

      //***************** REGISTER ************* */

      listOrdersCustomerDO=async(name:string)=>
      {
        let detailorder=await  LCUDetailOrder.getInstance().listOrdersCustomerDO(name);
        return detailorder
      }
      selectOrderDO=async(id:number)=>
      {
        let detailorder=await  LCUDetailOrder.getInstance().selectOrderDO(id);
        return detailorder
      }
      registerDOrderDO=async(id:number,quantity:number)=>
      {
        let detailorder=await LCUDetailOrder.getInstance().registerDOrderDO(id,quantity);
        return detailorder
      }
      calculateTotalDO=()=>
      {
          let detailorder= LCUDetailOrder.getInstance().calculateTotalDO();
        return detailorder
      }
      saveDOrderDO=async()=>
      {
        let detailorder= await LCUDetailOrder.getInstance().saveDOrderDO();
        return detailorder
      }
  
      //**************** UPDATE ******************** */
  
      updateDetailOrderDO=async(iddetailo:number,iddish:number,quantity:number)=> {

        let detailorder= await LCUDetailOrder.getInstance().updateDetailOrderDO(iddetailo,iddish,quantity);
        return detailorder
      }
  
     //***************** DELETE ALL **************** */
  
      deleteAllDO=async()=>
     {
        let detailorder= await LCUDetailOrder.getInstance().deleteAllDO();
        return detailorder
      }

      //*************************************** GETS *************************************************** */
      
     getLOrder=async(id:number)=>
     {
     let lorder= await LGetOrders.getLOrder(id);
     if (lorder===null) {
       throw new LogicException("The Order does not exists in the system");
       
     }
      return lorder.getDTO()
     }
     searchbyCustomer=async(id:number)=>
     {
      let lorder= await LGetOrders.searchbyCustomer(id);
      if (lorder===null) {
        throw new LogicException("The Customer have not Orders");
        
      }
       return lorder.getDTO()
      }
      searchbyCustomerExp=async(exp:string)=>
      {
       let lorders= await LGetOrders.searchbyCustomerExp(exp);
       let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
       return arraydto
       }


      getLOrders=async()=>
      {
        let lorders= await LGetOrders.getLOrders();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders.arrayorder);
        return arraydto
      }
      sortbyCustomerName=async()=>
      {
        let lorders= await LGetOrders.sortbyCustomerName();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
      sortbyNumberPeople=async()=>
      {
        let lorders= await LGetOrders.sortbyNumberPeople();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
      getPendingOrders=async()=>
      {
        let lorders= await LGetOrders.getPendingOrders();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
      getConfirmedOrders=async()=>
      {
        let lorders= await LGetOrders.getConfirmedOrders();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
      getCashedOrders=async()=>
      {
        let lorders= await LGetOrders.getCashedOrders();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
      getCanceledOrders=async()=>
      {
        let lorders= await LGetOrders.getCanceledOrders();
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto
      }
     
  
}