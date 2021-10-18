import DTODish from "../../shared/entity/DTODish";

export default interface IDataDish 
{
    registerDish(dtodish:DTODish):Promise<boolean>;
    updateDish(dtodish:DTODish):Promise<boolean>;
    getDishes():Promise<any[]>;

    //***************************************** */

    getDishCharacteristics(numberdish:number):Promise<any[]>;
    updateDishCharacteristic(dtodish:DTODish):Promise<boolean>;



}