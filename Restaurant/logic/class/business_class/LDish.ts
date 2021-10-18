import DTODish from "../../../shared/entity/DTODish";
import { LogicException } from "../../../shared/exceptions/logicexception";
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
getDTO=()=>
{
    let arraydtodishc=[];
    for(let ldishc of this.arraydishc)
    {
        let dtodishc=ldishc.getDTO();
        arraydtodishc.push(dtodishc);
    }
  let dtodish=new DTODish(this.iddish,this.name,
    this.category.name,this.description,this.img,this.price,arraydtodishc);
   return dtodish
}

   constructor(piddish:number,pname:string,pcategory:LogicCategory,
    pdescription:string,pimg:string,pprice:number)
   {
       this.iddish=piddish;
       this.name=pname;   
       this.category=pcategory;
       this.description=pdescription;   
       this.img=pimg;
       this.price=pprice;     
   }
}
