import DTOTableCustomer from "../../shared/entity/DTOTableCustomer";

export default interface IDataTableCustomer 
{
 
    registerTableCustomer(dtotc:DTOTableCustomer):Promise<boolean>;
    deleteTableCustomer(dtotc:DTOTableCustomer):Promise<boolean>;
    getTableCustomer():Promise<DTOTableCustomer[]>;
}