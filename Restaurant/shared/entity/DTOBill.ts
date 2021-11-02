export  default class DTOBill
{
   idbill: number;
    subtotal: number;
    totalb: number;
    vat: number;
    state: string;
    idorder: number;
    date: Date;
    
 
   constructor(pidbill:number,psubtotal:number,ptotalb:number,
    pvat:number,pstate:string,pidorder:number,pdate:Date)
   {
       this.idbill=pidbill;
       this.date=pdate;
       this.subtotal=psubtotal;
       this.totalb=ptotalb;
       this.vat=pvat;
       this.state=pstate;
       this.idorder=pidorder;     
   }
 
}