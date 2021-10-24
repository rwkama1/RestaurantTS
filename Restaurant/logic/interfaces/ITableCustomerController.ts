import DTOCustomer from "../../shared/entity/DTOCustomer";
import DTOTable from "../../shared/entity/DTOTable";
import DTOTableCustomer from "../../shared/entity/DTOTableCustomer";

export default interface ITableCustomerController 
{
     //********************** ADD WITHOUT PREVIOUS RESERVATION ******** */

     registerCustomer(dtc:DTOCustomer):Promise<boolean>
 
   //********************** ADD WITH PREVIOUS RESERVATION ************ */
 
     listCustomers():Promise<DTOCustomer[]>;
     getCustomerbyExpresion(exp:string):Promise<DTOCustomer[]>;
     enterCustomer(id:number):Promise<DTOCustomer>;
     listAvailableTable():Promise<DTOTable[]>;
     enterTable(id:number):Promise<DTOTable>;
     registerTableCustomer():Promise<boolean>;
    
    
    
   //************************** DELETE  ****************************** */
 
   getLTCSortbyCustomer():Promise<DTOTableCustomer[]>;
   selectTableCustomer(id:number):Promise<DTOTableCustomer>;
   deleteTableCustomer():Promise<boolean>;
 
 
    //********************* GETS ***************************************** */

    getLTableC(id:number):Promise<DTOTableCustomer>;
    getLTCbyCustomer(name:string,lastname:string):Promise<DTOTableCustomer>;
    getLTCbyTable(id:number):Promise<DTOTableCustomer>;

    getLSortbyCustomer():Promise<DTOTableCustomer[]>;
    getLSortbyTable():Promise<DTOTableCustomer[]>;
    getLTablesCustomers():Promise<DTOTableCustomer[]>;


}