import { throws } from "assert";
import { FactoryData } from "../../../../data/FactoryData";
import DTOCustomer from "../../../../shared/entity/DTOCustomer";
import DTOOrder from "../../../../shared/entity/DTOOrder";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicOrder from "../../business_class/LOrder";
import { LCUCustomer } from "../../customer_maintenance/maintenance/LCUCustomer";
import { LGetCustomer } from "../../customer_maintenance/maintenance/LGetsCustomer";
import { LGetDish } from "../../dish_maintenance/maintenance/LGetDish";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetOrders } from "./LGetOrders";

export class LCUOrders
{
    private static instancia: LCUOrders;
    private constructor() { }
    public static getInstance(): LCUOrders {
        if (!LCUOrders.instancia) {
            LCUOrders.instancia = new LCUOrders();
        }

        return LCUOrders.instancia;
    }
    private _orderobj: LogicOrder;
    public get orderobj(): LogicOrder {
        return this._orderobj;
    }
    public set orderobj(value: LogicOrder) {
        this._orderobj = value;
    }
    //************************************ REGISTER *************************** */

    //*** ONLINE ************* */
    
    registerCustomer=async(dtc:DTOCustomer)=>
    {
        let addc=await LCUCustomer.getInstance().registerCustomer(dtc);
        return addc
        
    } 
    //*** RESTAURANT ********* */

    getCustomerbyExpresionName=async(exp:string)=>
    {
        let customers=await LGetCustomer.getCustomerbyExpresion(exp);
        let arraydto=InstanceArrayDTO.instanceArrayCustomer(customers);
        return arraydto    
    } 
    enterCustomer=async(id:number)=>
    {
        let dtorder=new DTOOrder(0,new Date(),"Pending","ASD",2,id,[]);
        let lorder=await InstanceLogicClass.instanceLOrder(dtorder);
        this.orderobj=lorder;
        return this.orderobj.customer.getDTO();
       
    }   
    listDishes=async()=>
    {
        let dishes= await LGetDish.getLDishes();
        let arraydto=InstanceArrayDTO.instanceArrayDish(dishes.arraydish);
        return arraydto   
    }
    registerDOrder=async(id:number,quantity:number)=>
    {
      if (this.orderobj!=null) {

        let datadetailo=await this.orderobj.registerDetailOrder(id,quantity);
        return datadetailo

      }
      else
      {
        throw new LogicException("The Order is null");
      }
    }
    removeDOrder=async(id:number)=>
    {
      if (this.orderobj!=null) {

        let datadetailo= this.orderobj.removeDetailOrder(id);
        return datadetailo

      }
      else
      {
        throw new LogicException("The Order is null");
      }
    }
    calculateTotal=()=>
    {
      if (this.orderobj!=null) {

        let total= this.orderobj.calculateTotal();
        return total
      }
      else
      {
        throw new LogicException("The Order is null");
      }
    }
    closeOrder=(date:Date,pspecialr:string,pnpeople:number)=>
    {
        if (this.orderobj!=null) {

            let datao= this.orderobj.register(date,pspecialr,pnpeople);
            return datao
    
          }
          else
          {
            throw new LogicException("The Order is null");
          }

    }
    saveOrder=async()=>
    {
        if (this.orderobj!=null) {

            let datao= this.orderobj.getDTO();
            let addo=FactoryData.getDataOrder().registerOrder(datao);
            return addo
    
          }
          else
          {
            throw new LogicException("The Order is null");
          }
    }
    
    //************************************* UPDATE ************************** */

    listOrdersCustomer=async(name:string)=>
    {
        let lorders= await LGetOrders.searchbyCustomerExp(name);
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto   
    }
    selectOrder=async(id:number)=>
    {
      let lorder= await LGetOrders.getLOrder(id);
      if(lorder===null)
      {
        throw new LogicException("The Order does not exists in the system");
        
      }
      this.orderobj=lorder;
      return this.orderobj.getDTO()
    }
    updateCustomer=async(id:number)=>
    {
      if (this.orderobj!=null) {

      let customer= await LGetCustomer.getLCustomer(id);
      this.orderobj.customer=customer;
      return this.orderobj.getDTO();

      }
      else
      {
        throw new LogicException("The Order is null");
        
      }
    }
    updateData=(date:Date,pspecialr:string,pnpeople:number)=>
    {
        if (this.orderobj!=null) {

            let datao= this.orderobj.register(date,pspecialr,pnpeople);
            return datao
    
          }
          else
          {
            throw new LogicException("The Order is null");
          }

    }
    updateOrder=async()=>
    {
        if (this.orderobj!=null) {

            let datao= this.orderobj.getDTO();
            let addo=await FactoryData.getDataOrder().updateOrder(datao);
            return addo
    
          }
          else
          {
            throw new LogicException("The Order is null");
          }
    }
    //****** CHANGE STATE *******/

    updateState=async(state:string)=>
    {
      if (this.orderobj!=null) {

        this.orderobj.stateorder=state;
        let datao= this.orderobj.getDTO();
        let addo=await FactoryData.getDataOrder().updateOrder(datao);
        return addo

      }
      else
      {
        throw new LogicException("The Order is null");
      }
    }
}