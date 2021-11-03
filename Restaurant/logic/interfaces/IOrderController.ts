import DTOCustomer from "../../shared/entity/DTOCustomer";
import DTODeatilOrder from "../../shared/entity/DTODetailOrder";
import DTODish from "../../shared/entity/DTODish";
import DTOOrder from "../../shared/entity/DTOOrder";

export default interface IOrderController
{
    //***************** REGISTER ***************** */

   

    registerCustomer(dtc:DTOCustomer):Promise<DTOCustomer>;

    

    getCustomerbyExpresionName(exp:string):Promise<any[]>;
    enterCustomer(id:number):Promise<DTOCustomer>;
    listDishes():Promise<DTODish[]>;
    registerDOrder(id:number,quantity:number):Promise<DTODeatilOrder>;
    removeDOrder(id:number):Promise<boolean>;
    calculateTotal():number;
    closeOrder(date:Date,pspecialr:string,pnpeople:number):DTOOrder;
    saveOrder():Promise<boolean>;

     //******************* UPDATE ****************** */

     listOrdersCustomer(name:string):Promise<any[]>;
     selectOrder(id:number):Promise<DTOOrder>;
     updateCustomer(id:number):Promise<DTOOrder>;
     updateData(date:Date,pspecialr:string,pnpeople:number):DTOOrder;
     updateOrder():Promise<boolean>;

    //****** CHANGE STATE *******/

    updateState(state:string):Promise<boolean>;

    //***********************************  DETAIL ORDER ***************************************** */

    //******** REGISTER ********

    listOrdersCustomerDO(name:string):Promise<any[]>;
    selectOrderDO(id:number):Promise<DTOOrder>;
    registerDOrderDO(id:number,quantity:number):Promise<DTODeatilOrder>;
    calculateTotalDO():number;
    saveDOrderDO():Promise<boolean>;

    //********* UPDATE ***********

    updateDetailOrderDO(iddetailo:number,iddish:number,quantity:number):Promise<boolean>;

    //****** DELETE ALL **********/

    deleteAllDO():Promise<boolean>;

    //*************************************** GETS *************************************************** */

    getLOrder(id:number):Promise<DTOOrder>;
    searchbyCustomer(id:number):Promise<DTOOrder>;
    searchbyCustomerExp(exp:string):Promise<DTOOrder[]>;

    getLOrders():Promise<DTOOrder[]>;
    sortbyCustomerName():Promise<DTOOrder[]>;
    sortbyNumberPeople():Promise<DTOOrder[]>;
    getPendingOrders():Promise<DTOOrder[]>;
    getConfirmedOrders():Promise<DTOOrder[]>;
    getCashedOrders():Promise<DTOOrder[]>;
    getCanceledOrders():Promise<DTOOrder[]>;


}