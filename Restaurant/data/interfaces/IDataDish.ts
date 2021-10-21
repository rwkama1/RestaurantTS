import DTODish from "../../shared/entity/DTODish";

export default interface IDataDish 
{
    registerDish(dtodish:DTODish):Promise<boolean>;
    updateDish(dtodish:DTODish):Promise<boolean>;
    updateCost(dtodish:DTODish):Promise<boolean>;
    updateQuantity(dtodish:DTODish):Promise<boolean>;
    getDishes():Promise<any[]>;

    //***************************************** */

    getDishIngredients(numberdish:number):Promise<any[]>;
    addDishIngredient(dtodish:DTODish):Promise<boolean>;


}