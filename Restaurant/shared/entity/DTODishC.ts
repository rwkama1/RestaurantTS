export  default class DTODishC
{
    iddishc: number;
    namei: string;
    costi: number;
    quantity: number;
  

   constructor(piddishc:number,pnami:string,
    pcosti:number,pquantity:number)

   {
       this.iddishc=piddishc;
       this.namei=pnami;  
       this.costi=pcosti;
       this.quantity=pquantity;   
   }
      
}