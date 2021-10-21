import { FactoryData } from "../../../../data/FactoryData";
import DTODishC from "../../../../shared/entity/DTODishC";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicDish from "../../business_class/LDish";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";

import { LGetDish } from "./LGetDish";

export class LCUIngredients {

    private static instancia: LCUIngredients;
    private constructor() { }
    public static getInstance(): LCUIngredients {
        if (!LCUIngredients.instancia) {
            LCUIngredients.instancia = new LCUIngredients();
        }
  
        return LCUIngredients.instancia;
    }
    private _dishobj: LogicDish;

    public get dishobj(): LogicDish {
        return this._dishobj;
    }
    public set dishobj(value: LogicDish) {
        this._dishobj = value;
    }

 


    listDishes=async()=>
    {
        let dishes= await LGetDish.getLDishes();
        let arraydto=InstanceArrayDTO.instanceArrayDish(dishes.arraydish);
        return arraydto
    }
    selectDish=async(id:number)=>
    {
      let dish= await LGetDish.getLDish(id);
      if(dish===null)
      {
        throw new LogicException("The Dish does not exists in the system");
      }
     this.dishobj=dish;
     let dtodish= this.dishobj.getDTO(); 
     let listingredients=dtodish.arraycharact;
     return listingredients
      
    } 

    //**************** UPDATE ********************* */

    selectIngredient=async(idingredient:number)=>
    {
      let ingre= await this.dishobj.searchIngredient(idingredient);

      if(ingre===null)
      {
        throw new LogicException("The Ingredient does not exists in the Dish");
      }
     
      return ingre.getDTO()
    } 
    updateIngredient=async(dtoing:DTODishC)=>
    {
      let ingre= await this.dishobj.updateIngredient(dtoing);
      return ingre
    } 
    updateCost=async()=>
    {
      let newcost= await this.dishobj.calculateCost();
      return this.dishobj.getDTO()
    } 
    updateDish=async()=>
    {
     if(this.dishobj!=null)
      {
        let datadish=await this.dishobj.getDTO();
        const upddish=await FactoryData.getDataDish().updateDish(datadish);
        if(upddish===true)
        {
          const updatecost=await FactoryData.getDataDish().updateCost(datadish);
          this.dishobj=null;
          return updatecost;  
        }
   
      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }

    }

    //******************** REGISTER  ************ */

    registerIngredient=async(dtoing:DTODishC)=>
    {
      if(this.dishobj!=null)
      {
        let ingre= await this.dishobj.registerIngredient(dtoing);
        const reging=await FactoryData.getDataDish().addDishIngredient(ingre);
        if(reging===true)
        {
          const updatecost=await FactoryData.getDataDish().updateCost(ingre);
          this.dishobj=null;
          return updatecost;  
        }
        
       
      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }
    
    } 

}