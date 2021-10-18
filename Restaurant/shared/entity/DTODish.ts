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

    
 
   constructor(piddish:number,pname:string,pcategory:string,
    pdescription:string,pimg:string,pprice:number,parraycharact:DTODishC[])
   {
       this.iddish=piddish;
       this.name=pname;   
       this.category=pcategory;
       this.description=pdescription;   
       this.img=pimg;
       this.price=pprice; 
       this.arraycharact=parraycharact;         
   }
      
}