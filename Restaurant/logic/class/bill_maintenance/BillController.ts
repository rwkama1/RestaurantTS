import IBillController from "../../interfaces/IBillController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCBill } from "./maintenance/LCBill";
import { LGetBill } from "./maintenance/LGetBill";

export class BillController implements IBillController{

    private static instancia: BillController;
    private constructor() { }
    public static getInstance(): BillController {
        if (!BillController.instancia) {
            BillController.instancia = new BillController();
        }

        return BillController.instancia;
    }
     // REGISTER 

     listOrdersCustomerB=async(name:string)=>
     {
         let lbill= await LCBill.getInstance().listOrdersCustomerB(name);
         return lbill
     }
     selectOrderB=async(id:number)=>
     {
        let lbill= await LCBill.getInstance().selectOrderB(id);
        return lbill
     }
     enterVATPercentage=(vat:number)=>
     {
        let lbill=  LCBill.getInstance().enterVATPercentage(vat);
        return lbill
     }
     enterDate=(date:Date)=>
     {
        let lbill=  LCBill.getInstance().enterDate(date);
        return lbill
     }
      saveBill=async()=>
     {
        let lbill= await  LCBill.getInstance().saveBill();
        return lbill
     }

       // COLLECT  BILL

    listCustomerBill=async(name:string)=>
    {
        let lcollectbill= await LCBill.getInstance().listCustomerBill(name);
         return lcollectbill   
    }
    selectBill=async(id:number)=>
    {
        let lcollectbill= await LCBill.getInstance().selectBill(id);
        return lcollectbill   
    }
    collectBill=async(customeramount:number)=>
    {
        let lcollectbill= await LCBill.getInstance().collectBill(customeramount);
        return lcollectbill 
    }

    // CANCEL BILL

    cancelBill=async()=>
    {
        let lcollectbill= await LCBill.getInstance().cancelBill();
        return lcollectbill 
    }

    //************************* GETS ******************** */

   getLBill=async(id:number)=>
    {
        let lgetbill= await LGetBill.getLBill(id);
        return lgetbill.getDTO();
    } 
   getLBillbyOrder=async(id:number)=>
  {
    let lgetbill= await LGetBill.getLBillbyOrder(id);
    return lgetbill.getDTO();
  }
   getLBillbyCustomer=async(name:string)=>
  {
    let lgetbill= await LGetBill.getLBillbyCustomer(name);
     let arraydto=InstanceArrayDTO.instanceArrayBill(lgetbill);
        return arraydto
  }


   getLBillbyDates=async(date1:Date,date2:Date)=>
  {
    let lgetbill= await LGetBill.getLBillbyDates(date1,date2);
    let arraydto=InstanceArrayDTO.instanceArrayBill(lgetbill);
       return arraydto
  }
   getLBills=async()=>
  {
    let lgetbill= await LGetBill.getLBills();
    let arraydto=InstanceArrayDTO.instanceArrayBill(lgetbill.arraybill);
       return arraydto
  }
 }
