import DTOOrder from "../../shared/entity/DTOOrder";

export default interface IDataOrder 
{
    registerOrder(dtoorder:DTOOrder):Promise<boolean>;
    updateOrder(dtoorder:DTOOrder):Promise<boolean>;
    getOrders():Promise<DTOOrder[]>;

    //********************* DETAIL ORDER ************** */

    registerDetailOrder(dtoorder:DTOOrder):Promise<boolean>;
    deleteDetailOrder(dtoorder:DTOOrder):Promise<boolean>;
 


    
}