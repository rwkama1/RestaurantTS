import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicBill from "../../business_class/LBill";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { LGetOrders } from "../../order_maintenance/maintenance/LGetOrders";

export class LCBill {

    private static instancia: LCBill;
    private constructor() { }
    public static getInstance(): LCBill {
        if (!LCBill.instancia) {
            LCBill.instancia = new LCBill();
        }
  
        return LCBill.instancia;
    }
    private _billobj: LogicBill;

    public get billobj(): LogicBill {
        return this._billobj;
    }
    public set billobj(value: LogicBill) {
        this._billobj = value;
    }
    listOrdersCustomerB=async(name:string)=>
    {
        let lorders= await LGetOrders.searchbyCustomerExp(name);
        let arraydto=InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto   
    }
    selectOrderB=async(id:number)=>
    {
      let lorder= await LGetOrders.getLOrder(id);
      if(lorder===null)
      {
        throw new LogicException("The Order does not exists in the system");
        
      }
      let newobj=new LogicBill(0,0,0,0,)
      this.orderobj=lorder;
      return this.orderobj.getDTO()
    }
  
    
}