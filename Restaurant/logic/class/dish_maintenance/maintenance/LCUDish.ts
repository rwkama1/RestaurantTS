import { FactoryData } from "../../../../data/FactoryData";
import DTODish from "../../../../shared/entity/DTODish";
import DTODishC from "../../../../shared/entity/DTODishC";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicDish from "../../business_class/LDish";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";

import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetDish } from "./LGetDish";

export class LCUDish {

    private static instancia: LCUDish;
    private constructor() { }
    public static getInstance(): LCUDish {
        if (!LCUDish.instancia) {
            LCUDish.instancia = new LCUDish();
        }
  
        return LCUDish.instancia;
    }
    private _dishobj: LogicDish;
    public get dishobj(): LogicDish {
        return this._dishobj;
    }
    public set dishobj(value: LogicDish) {
        this._dishobj = value;
    }
//****************** UPDATE *************** */

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
      return this.dishobj.getDTO()
    } 
    updateDish=async(dtodish:DTODish)=>
    {
     if(this.dishobj!=null)
      {
        let datadish=await this.dishobj.update(dtodish);
        const upddish=await FactoryData.getDataDish().updateDish(datadish);
        this.dishobj=null;
        return upddish;  
      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }

    }
  //******************** REGISTER ******************* */
    
    enterDataDish=async(dtodish:DTODish)=>
    {
         let ldish=await InstanceLogicClass.instanceLDish(dtodish);
         let datac=await ldish.register();
         this.dishobj=ldish;
         return datac
    }
    registerDIngredient=async(dtoing:DTODishC)=>
    {
      if (this.dishobj!=null) {

        let datadish=await this.dishobj.registerIngredient(dtoing);
        return datadish

      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }
    }
    removeDIngredient=async(idingre:number)=>
    {
      if (this.dishobj!=null) {

        let datadish=await this.dishobj.removeIngredient(idingre);
        return datadish

      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }
    }
    saveDishDB=async(pricedish:number)=>
    {
      if(this.dishobj!=null)
      {
        this.dishobj.price=pricedish;
        const savedish=await FactoryData.getDataDish().registerDish(this.dishobj.getDTO());
        if(savedish===true)
        {
          const upcost=await FactoryData.getDataDish().updateCost(this.dishobj.getDTO());
          this.dishobj=null;
          return upcost;  
        }
 
       
      }
      else
      {
        throw new LogicException("The Dish does not exists in the system");
      }
    }

    //********************* REGISTER QUANTITY ************************* */
    addQuantity=async(quantity:number)=>
    {
      if(this.dishobj!=null)
      {
        this.dishobj.quantity=this.dishobj.quantity+quantity;
        const savedish=await FactoryData.getDataDish().updateQuantity(this.dishobj.getDTO());
        this.dishobj=null; 
        return savedish
      }
      else
      {
        throw new LogicException("The Dish is null");
      }
    }
}