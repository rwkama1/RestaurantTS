import DTODishC from "./DTODishC";

export  default class DTODish
{
    iddish: number;
    name: string;
    category: string;
    description: string;
    img: string;
    price: number;
    arraycharact: DTODishC[];
    cost: number;
    quantity: number;

    
 
   constructor(piddish:number,pname:string,pcategory:string,
    pdescription:string,pimg:string,pprice:number,parraycharact:DTODishC[],pcost:number,pquantity:number)
   {
       this.iddish=piddish;
       this.name=pname;   
       this.category=pcategory;
       this.description=pdescription;   
       this.img=pimg;
       this.price=pprice; 
       this.arraycharact=parraycharact; 
       this.cost=pcost;
       this.quantity=pquantity;         
   }
      
}