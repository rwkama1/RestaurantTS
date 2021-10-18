import DTOCustomer from "../../shared/entity/DTOCustomer";

export default interface IDataCustomer 
{
     getCustomers():Promise<DTOCustomer[]>; 
     registerCustomer(dtc:DTOCustomer):Promise<boolean>;
     updateCustomer(dtuser:DTOCustomer):Promise<boolean>;
}