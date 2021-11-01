export  default class DTOBill
{
   idbill: number;
    subtotal: number;
    totalb: number;
    vat: number;
    state: string;
    idorder: number;
    
 
   constructor(pidbill:number,psubtotal:number,ptotalb:number,
    pvat:number,pstate:string,pidorder:number)
   {
       this.idbill=pidbill;
       this.subtotal=psubtotal;
       this.totalb=ptotalb;
       this.vat=pvat;
       this.state=pstate;
       this.idorder=pidorder;     
   }
 
}