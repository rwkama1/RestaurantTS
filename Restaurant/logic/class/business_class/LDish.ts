import DTODish from "../../../shared/entity/DTODish";
import DTODishC from "../../../shared/entity/DTODishC";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LGetCategory } from "../category_maintenance/maintenance/LGetCategory";
import { LGetDish } from "../dish_maintenance/maintenance/LGetDish";
import LogicCategory from "./LCategory";
import LogicDishC from "./LDishC";

export  default class LogicDish
{
  
  private _iddish: number;
  private  _name: string;
  private  _category: LogicCategory;
  private  _description: string;
  private _img: string;
  private  _price: number;
  private  _arraydishc: LogicDishC[];
  private _cost: number;
   private _quantity: number;
  

//GETTERS 
   
public get iddish(): number {
    return this._iddish;
}
public get name(): string {
    return this._name;
}
public get category(): LogicCategory {
    return this._category;
}
public get description(): string {
    return this._description;
}
public get img(): string {
    return this._img;
}
public get price(): number {
    return this._price;
}
public get arraydishc(): LogicDishC[] {
    return this._arraydishc;
}
public get cost(): number {
    return this._cost;
}
public get quantity(): number {
    return this._quantity;
}
//SETTERS

public set iddish(value: number) {
    this._iddish = value;
}
public set name(value: string) {
    if (value.trim() === "")
    {
        throw new LogicException("The name cannot be empty");
    }
    this._name = value;
}   
public set category(value: LogicCategory) {
    this._category = value;
} 
public set description(value: string) {
    if (value.trim() === "")
    {
        throw new LogicException("The description cannot be empty");
    }
    this._description = value;
}
public set img(value: string) {
    if (!(value.trim().match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)))
    {
        throw new LogicException("Only images files are allowed");
    }
   this._img = value;
}
public set price(value: number) {
    if (value<1)
    {
     throw new LogicException("The price must be greater than 0");
    }
    this._price = value;
}
public set arraydishc(value: LogicDishC[]) {
  
    this._arraydishc = value;
}
public set cost(value: number) {
    if (value<1)
    {
     throw new LogicException("The cost must be greater than 0");
    }
    this._cost = value;
}
public set quantity(value: number) {
    if (value<1)
    {
     throw new LogicException("The quantity must be greater than 0");
    }
    this._quantity = value;
}

register=async()=>
{
    let listdishes=await LGetDish.getLDishes();
    let listlength=listdishes.arraydish.length;
    this.iddish=listlength+1;
    this.arraydishc=[];
    return this.getDTO();

}
update=async(dtodish: DTODish)=> {

    let searchcategory=await LGetCategory.getLCategory(dtodish.category);
    if(searchcategory===null)
    {
        throw new LogicException("The Category does not exists");
        
    }   
    this.name=dtodish.name;
    this.category=searchcategory;
    this.description=dtodish.description;
    this.img=dtodish.img;
    this.price=dtodish.price;
    this.quantity=dtodish.quantity;
    return this.getDTO()
}
calculateCost=()=> {
    let totalcost=0;
    for(let ldishi of this.arraydishc)
    {
        totalcost=totalcost+ldishi.calculateAmount();
    } 
    this.cost=totalcost;
   return this.cost
    
}
//******************* INGREDIENTS ***********************  */

registerIngredient=async(dtodishi: DTODishC)=> {

    let lengtharrayi=this.arraydishc.length;
    this.arraydishc.push(new LogicDishC(lengtharrayi,dtodishi.namei,dtodishi.costi,dtodishi.quantity));
    this.cost=this.calculateCost();
    return this.getDTO()

}
removeIngredient=async(iding: number)=> {
    let listingredients = this.arraydishc;
    for (let i =0; i < listingredients.length; i++)
    {
        if (listingredients[i].iddishc === iding) {
            listingredients.splice(i,1);
            break;
        }
    }
    this.cost=this.calculateCost();
    return this.getDTO()
}
updateIngredient=async(dtodishi: DTODishC)=> {
    for(let ldishi of this.arraydishc)
    {
        if(ldishi.iddishc===dtodishi.iddishc)
        {
            ldishi.update(dtodishi);
            return ldishi.getDTO()
        }
    }  

}
searchIngredient=async(idingredient: number)=> {
    for(let ldishi of this.arraydishc)
    {
        if(ldishi.iddishc===idingredient)
        {
            return ldishi;
        }
    } 
    return null; 
}

getDTO=()=>
{
    let arraydtodishc=[];
    for(let ldishc of this.arraydishc)
    {
        let dtodishc=ldishc.getDTO();
        arraydtodishc.push(dtodishc);
    }
  let dtodish=new DTODish(this.iddish,this.name,
    this.category.name,this.description,this.img,this.price,arraydtodishc,
    this.cost,this.quantity);
   return dtodish
}

   constructor(piddish:number,pname:string,pcategory:LogicCategory,
    pdescription:string,pimg:string,pprice:number,parraydishc:LogicDishC[],pcost:number
    ,pquantity:number)
   {
       this.iddish=piddish;
       this.name=pname;   
       this.category=pcategory;
       this.description=pdescription;   
       this.img=pimg;
       this.price=pprice;
       this.arraydishc=parraydishc; 
       this.cost=pcost;  
       this.quantity=pquantity;    
   }
}
