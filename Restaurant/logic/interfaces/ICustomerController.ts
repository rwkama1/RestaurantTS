import DTOCustomer from "../../shared/entity/DTOCustomer";

export default interface ICustomerController 
{
    //**************** GETS **************** */

    getLSortCustomers():Promise<DTOCustomer[]>;
    getLCustomer(id:number):Promise<DTOCustomer>;
    getLCustomerbyName(name:string,lastname:string):Promise<DTOCustomer>;
    getLCustomers():Promise<DTOCustomer[]>;
    getCustomerbyExpresion(exp:string):Promise<DTOCustomer[]>;
   
    //**************** REGISTER **************** */

    registerCustomer(dtc:DTOCustomer):Promise<boolean>;

}