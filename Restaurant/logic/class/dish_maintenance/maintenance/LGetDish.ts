import { FactoryData } from "../../../../data/FactoryData";
import { ArrayDish } from "../../business_class/array/LArrayDish";
import LogicDish from "../../business_class/LDish";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetDish
{
    
 
    static getLDish=async(id:number)=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.search(id);
      return searchdish
    }
    static getLDishWithoutI=async(id:number)=>
    {
      let datadishes= await this.getLDishesWithoutI();
      let searchdish=datadishes.search(id);
      return searchdish
    }
   static searchLDishCategory=async(name:string)=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.searchbyCategory(name);
      return searchdish
    } 
    //************************************************** */
    static sortDishbyName=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyName();
      return searchdish
    }
    static sortbyDishCategoryName=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyCategoryName();
      return searchdish
    }
    static sortbyDishPriceAscending=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyPriceAscending();
      return searchdish
    }
    static sortbyDishPriceDescending=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyPriceDescending();
      return searchdish
    }
    static sortbyCost=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyCost();
      return searchdish
    }
    static sortbyQuantity=async()=>
    {
      let datadishes= await this.getLDishes();
      let searchdish=datadishes.sortbyQuantity();
      return searchdish
    }
    static getLDishes=async()=>
    {
    let arrayd:LogicDish[]=[];
    let datad= await FactoryData.getDataDish().getDishes();
      for(var dtod of datad)
      {
        const logicdish=await InstanceLogicClass.instanceLDish(dtod);
        arrayd.push(logicdish);
      }
    let arraylogicdishes=new ArrayDish(arrayd);
    return arraylogicdishes; 
    }
    static getLDishesWithoutI=async()=>
    {
    let arrayd:LogicDish[]=[];
    let datad= await FactoryData.getDataDish().getDishesWithoutI();
      for(var dtod of datad)
      {
        const logicdish=await InstanceLogicClass.instanceLDish(dtod);
        arrayd.push(logicdish);
      }
    let arraylogicdishes=new ArrayDish(arrayd);
    return arraylogicdishes; 
    }

}