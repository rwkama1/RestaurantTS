import DTODish from "../../../../shared/entity/DTODish";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import LogicDish from "../LDish";

export class ArrayDish
{
    arraydish: LogicDish[];
    
    constructor(parraydish:LogicDish[])
       {
        this.arraydish=parraydish;
       }

       search=(iddish:number)=>
       {
       let listc=this.arraydish;
       for(let dish of listc)
         {
           if(iddish===dish.iddish)
           {
             return dish;
           }
         }
         return null;
       }
       searchbyCategory=(name:string)=>
       {
        let arraydishcateg=[];
        let listc=this.arraydish;
        for(let dish of listc)
            {
            if(name===dish.category.name)
            {
                arraydishcateg.push(dish);
            }
            }
            return arraydishcateg
       }

       //********************************* */

       sortbyName=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => a.name.localeCompare(b.name));
        return sortarray
       }
       sortbyCategoryName=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => a.category.name.localeCompare(b.category.name));
        return sortarray
       }
       sortbyPriceAscending=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => a.price-b.price);
        return sortarray
       }
       sortbyPriceDescending=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => b.price-a.price);
        return sortarray
       }
       sortbyQuantity=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => b.quantity-a.quantity);
        return sortarray
       }
       sortbyCost=()=>
       {
        const sortarray=this.arraydish.sort((a, b) => b.cost-a.cost);
        return sortarray
       }
     

    
}