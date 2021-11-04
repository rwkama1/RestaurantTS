import { FactoryData } from "../../../../data/FactoryData";
import DTOBill from "../../../../shared/entity/DTOBill";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicBill from "../../business_class/LBill";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LCUOrders } from "../../order_maintenance/maintenance/LCUOrders";
import { LGetOrders } from "../../order_maintenance/maintenance/LGetOrders";
import { LGetBill } from "./LGetBill";

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

    // REGISTER 

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
      let dto=new DTOBill(0,0,0,0,"Pending",id,new Date())
      let newobj=await InstanceLogicClass.instanceLBill(dto);
      this.billobj=newobj;
      return this.billobj.lorder.getDTO();
    }
    calculateTotal=(vat:number)=>
    {
        if (this.billobj!=null) {

            this.billobj.vat=vat;
            let vatsubtotal=this.billobj.calculateTotal();
            return vatsubtotal
        } else {
            throw new LogicException("The Bill is null");
            
        }
    }
    enterDate=(date:Date)=>
    {
        if (this.billobj!=null) {

            this.billobj.date=date;
            return this.billobj.getDTO();
        } else {
            throw new LogicException("The Bill is null");
            
        }
    }
     saveBill=async()=>
    {
        if (this.billobj!=null) {

            let dtobill=this.billobj.getDTO(); 
            let addb=await FactoryData.getDataBill().registerBill(dtobill);
             if (addb) {
                    return this.billobj
                }
        }
         else {
            throw new LogicException("The Bill is null");
            
        }
    }

    // COLLECT  BILL

    listCustomerBill=async(name:string)=>
    {
        let lbills= await LGetBill.getLBillbyCustomer(name);
        let arraydto=InstanceArrayDTO.instanceArrayBill(lbills);
        return arraydto   
    }
    selectBill=async(id:number)=>
    {
      let lbill= await LGetBill.getLBill(id);
      if(lbill===null)
      {
        throw new LogicException("The Bill does not exists in the system");
        
      }
      
      this.billobj=lbill;
      return this.billobj.getDTO();
    }
    collectBill=async(customeramount:number)=>
    {

    if (this.billobj!=null) {

        if(customeramount>this.billobj.totalb)
         {
            this.billobj.state="Cashed";
            let reimbursement =customeramount-this.billobj.totalb;
            let dtobill=this.billobj.getDTO(); 
            let addb=await FactoryData.getDataBill().updateState(dtobill);
             if (addb) {
                 let updateo=await LCUOrders.getInstance().updateCashedState(dtobill.idorder);
                 if (updateo) {
                    return reimbursement 
                 }
              
                    
                }
        } 
        else {
            throw new LogicException("The Customer Amount must be greather than the Total")
        }
            
          
        } else {
            throw new LogicException("The Bill is null");
            
        }
    }

    // CANCEL BILL

    cancelBill=async()=>
    {

    if (this.billobj!=null) {

            this.billobj.state="Canceled";
            let dtobill=this.billobj.getDTO(); 
            let addb=await FactoryData.getDataBill().updateState(dtobill);
             if (addb) {
                    return dtobill
                }
       
          
        }
         else {
            throw new LogicException("The Bill is null");
            
        }
    }




    
}