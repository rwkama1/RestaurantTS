import DTOBill from "../../shared/entity/DTOBill";
import DTOOrder from "../../shared/entity/DTOOrder";
import LogicBill from "../class/business_class/LBill";

export default interface IBillController 
{
   
    //  //************ REGISTER ********************** */

    listOrdersCustomerB(name:string):Promise<DTOOrder[]>;
    selectOrderB(id:number):Promise<DTOOrder>;
    calculateTotal(vat:number):number;
    enterDate(date:Date):DTOBill;
    saveBill():Promise<LogicBill>;

     // **************** COLLECT  BILL ************************ 

     listCustomerBill(name:string):Promise<DTOBill[]>;
     selectBill(id:number):Promise<DTOBill>;
     collectBill(customeramount:number):Promise<number>;
   
     // **************** CANCEL  BILL ************************ 

     cancelBill():Promise<DTOBill>;

    //  //********************* GETS ************************ */
   
    getLBill(id:number):Promise<DTOBill>;
    getLBillbyOrder(id:number):Promise<DTOBill>;

    getLBillbyCustomer(name:string):Promise<DTOBill[]>;
    getLBillbyDates(date1:Date,date2:Date):Promise<DTOBill[]>;
    getLBills():Promise<DTOBill[]>;

    
}