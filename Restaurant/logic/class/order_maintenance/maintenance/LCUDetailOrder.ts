import { FactoryData } from "../../../../data/FactoryData";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicOrder from "../../business_class/LOrder";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { LGetOrders } from "./LGetOrders";

export class LCUDetailOrder
{
    private static instancia: LCUDetailOrder;
    private constructor() { }
    public static getInstance(): LCUDetailOrder {
        if (!LCUDetailOrder.instancia) {
            LCUDetailOrder.instancia = new LCUDetailOrder();
        }

        return LCUDetailOrder.instancia;
    }
    private _orderobj: LogicOrder;
    public get orderobj(): LogicOrder {
        return this._orderobj;
    }
    public set orderobj(value: LogicOrder) {
        this._orderobj = value;
    }

    //**************************** REGISTER ************* */

    listOrdersCustomerDO=async(name:string)=>
    {
        let lorders= await LGetOrders.searchbyCustomerExp(name);
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto   
    }
    selectOrderDO=async(id:number)=>
    {
      let lorder= await LGetOrders.getLOrder(id);
      if(lorder===null)
      {
        throw new LogicException("The Order does not exists in the system");
        
      }
      this.orderobj=lorder;
      return this.orderobj.getDTO()
    }
    registerDOrderDO=async(id:number,quantity:number)=>
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
    calculateTotalDO=()=>
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
    saveDOrderDO=async()=>
    {
      if (this.orderobj!=null) {

        let dtoorder=this.orderobj.getDTO();
        let adddo=await FactoryData.getDataOrder().registerDetailOrder(dtoorder);
        return adddo
      }
      else
      {
        throw new LogicException("The Order is null");
      }
    }

    //***************************** UPDATE ******************** */

    updateDetailOrderDO=async(iddetailo:number,iddish:number,quantity:number)=> {
        if (this.orderobj!=null) {

            let dtoorder=await this.orderobj.updateDetailOrder(iddetailo,iddish,quantity);
            let adddo=await FactoryData.getDataOrder().updateOrder(dtoorder);
            return adddo
          }
          else
          {
            throw new LogicException("The Order is null");
          }
    
    }

   //***************************** DELETE ALL **********************/

    deleteAllDO=async()=>
   {
     if (this.orderobj!=null) {

       let dtoorder=this.orderobj.getDTO();
       let adddo=await FactoryData.getDataOrder().deleteDetailOrder(dtoorder);
       return adddo
     }
     else
     {
       throw new LogicException("The Order is null");
     }
    }

}