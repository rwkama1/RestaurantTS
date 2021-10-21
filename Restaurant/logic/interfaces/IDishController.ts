import DTODish from "../../shared/entity/DTODish";
import DTODishC from "../../shared/entity/DTODishC";

export default interface IDishController
{
   
    //  //************ MAINTENANCE ********************** */
    // UPDATE

    listDishes():Promise<DTODish[]>;
    selectDish(id:number):Promise<DTODish>;
    updateDish(dtodish:DTODish):Promise<boolean>;

    // REGISTER

    enterDataDish(dtodish:DTODish):Promise<DTODish>
    registerDIngredient(dtoing:DTODishC):Promise<DTODish>
    removeDIngredient(idingre:number):Promise<DTODish>
    saveDishDB(pricedish:number):Promise<boolean>
   
         
    //  //********************* GETS ************************ */

    getDish(id:number):Promise<DTODish>;
    searchLDishCategory(name:string):Promise<any[]>;

    sortDishbyName():Promise<any[]>;
    sortbyDishCategoryName():Promise<any[]>;
    sortbyDishPriceAscending():Promise<any[]>;
    sortbyDishPriceDescending():Promise<any[]>;
    sortbyCost():Promise<any[]>;
    sortbyQuantity():Promise<any[]>;
    getDishes():Promise<any[]>;

    //********************* INGREDIENTS ***************************** */

    listDishesI():Promise<any[]>;
    selectDishI(id:number):Promise<DTODishC[]>;
    
    // UPDATE 
   
    selectIngredient(id:number):Promise<DTODishC>;
    updateIngredient(dtoing:DTODishC):Promise<DTODishC>;
    updateCost():Promise<DTODish>;
    updateDishI():Promise<boolean>;

    // REGISTER 
    
    registerIngredient(dtoing:DTODishC):Promise<boolean>;



}