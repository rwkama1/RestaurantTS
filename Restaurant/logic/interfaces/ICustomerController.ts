import DTOCustomer from "../../shared/entity/DTOCustomer";

export default interface ICustomerController 
{
    //**************** GETS **************** */

    getLSortCustomers():Promise<DTOCustomer[]>;
    getLCustomer(idcard:string):Promise<DTOCustomer>;
    getLCustomerbyName(name:string,lastname:string):Promise<DTOCustomer>;
    getLCustomers():Promise<DTOCustomer[]>
   
    //**************** MAINTENACE **************** */

    listCustomers():Promise<any[]>;
    getCustomersbyName(name:string,lastname:string):Promise<DTOCustomer>;
    selectCustomer(idcard:string):Promise<DTOCustomer>;
    updateCustomer(dtc:DTOCustomer):Promise<boolean>;
    registerCustomer(dtc:DTOCustomer):Promise<boolean>;


     //**************** LOGIN **************** */

    loginCustomer(idcard:string,password:string):Promise<DTOCustomer>;
    getloginCustomer():DTOCustomer;
    logout():boolean;
    
}