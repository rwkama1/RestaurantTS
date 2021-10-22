import DTODish from "../../../shared/entity/DTODish";
import DTODishC from "../../../shared/entity/DTODishC";
import IDishController from "../../interfaces/IDishController";

import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCUDish } from "./maintenance/LCUDish";
import { LCUIngredients } from "./maintenance/LCUIngredients";
import { LGetDish } from "./maintenance/LGetDish";

export class DishController implements IDishController{

    private static instancia: DishController;
    private constructor() { }
    public static getInstance(): DishController {
        if (!DishController.instancia) {
            DishController.instancia = new DishController();
        }

        return DishController.instancia;
    }
    //************ MAINTENANCE ********************** */

    listDishes=async()=>
    {
        let dishes= await LCUDish.getInstance().listDishes();
        return dishes
    }
    selectDish=async(id:number)=>
    {
      let dish= await LCUDish.getInstance().selectDish(id);
      return dish
    }
    updateDish=async(dtodish:DTODish)=>
    {
        let dish= await LCUDish.getInstance().updateDish(dtodish);
        return dish
    }
     //****************************** */

    enterDataDish=async(dtodish:DTODish)=>
    {
        let dish= await LCUDish.getInstance().enterDataDish(dtodish);
        return dish
    }
    registerDIngredient=async(dtoing:DTODishC)=>
    {
        let dish= await LCUDish.getInstance().registerDIngredient(dtoing);
        return dish
    }
    removeDIngredient=async(idingre:number)=>
    {
        let dish= await LCUDish.getInstance().removeDIngredient(idingre);
        return dish
    }
    saveDishDB=async(pricedish:number)=>
    {
        let dish= await LCUDish.getInstance().saveDishDB(pricedish);
        return dish
    }

    // REGISTER QUANTITY

    addQuantity=async(quantity:number)=>
    {
        let dish= await LCUDish.getInstance().addQuantity(quantity);
        return dish
    }


    //*********************** GETS   ************************** */

     getDish=async(id:number)=>
    {
        let getdish= await LGetDish.getLDish(id);
      return getdish.getDTO()
    }
     searchLDishCategory=async(name:string)=>
    {
        let getdish= await LGetDish.searchLDishCategory(name);
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
  
    }


     sortDishbyName=async()=>
    {
        let getdish= await LGetDish.sortDishbyName();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
    }
     sortbyDishCategoryName=async()=>
    {
        let getdish= await LGetDish.sortbyDishCategoryName();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto 
    }
     sortbyDishPriceAscending=async()=>
    {
        let getdish= await LGetDish.sortbyDishPriceAscending();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
    }
     sortbyDishPriceDescending=async()=>
    {
        let getdish= await LGetDish.sortbyDishPriceDescending();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
    }
    sortbyCost=async()=>
    {
        let getdish= await LGetDish.sortbyCost();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
    }
    sortbyQuantity=async()=>
    {
        let getdish= await LGetDish.sortbyQuantity();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto
    }
     getDishes=async()=>
    {
        let getdish= await LGetDish.getLDishes();
        let arraydto=InstanceArrayDTO.instanceArrayDish(getdish.arraydish);
        return arraydto
        
    }

    //*********************** INGREDIENTS ************************ */

    listDishesI=async()=>
    {
        let dishes= await LCUIngredients.getInstance().listDishes();
        return dishes
    }
    selectDishI=async(id:number)=>
    {
        let dish= await LCUIngredients.getInstance().selectDish(id);
        return dish
      
    } 

    //************* UPDATE **** */

    selectIngredient=async(idingredient:number)=>
    {
        let ing= await LCUIngredients.getInstance().selectIngredient(idingredient);
        return ing
    } 
    updateIngredient=async(dtoing:DTODishC)=>
    { 
        let ing= await LCUIngredients.getInstance().updateIngredient(dtoing);
        return ing
    } 
    updateCost=async()=>
    {
        let ing= await LCUIngredients.getInstance().updateCost();
        return ing
    } 
    updateDishI=async()=>
    {
        let ing= await LCUIngredients.getInstance().updateDish();
        return ing

    }

    //********* REGISTER **** */
    
    registerIngredient=async(dtoing:DTODishC)=>
    {
        let ing= await LCUIngredients.getInstance().registerIngredient(dtoing);
        return ing 
    }
}