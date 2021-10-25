export  default class DTODeatilOrder
{
    iddetailorder: number;
    quantitydo: number;
    amountdo: number;
    iddish: number;
   
    constructor(piddetailorder:number,pquantitydo:number,pamountdo:number,
        piddish:number)
       {
           this.iddetailorder=piddetailorder;
           this.quantitydo=pquantitydo; 
           this.amountdo=pamountdo;
           this.iddish=piddish; 
         
       }
      
}