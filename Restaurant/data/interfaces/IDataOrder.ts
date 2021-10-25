import DTOOrder from "../../shared/entity/DTOOrder";

export default interface IDataOrder 
{
    getOrders():Promise<DTOOrder[]>;
    
}