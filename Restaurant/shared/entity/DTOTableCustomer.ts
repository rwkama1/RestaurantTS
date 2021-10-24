import DTOCustomer from "./DTOCustomer";

export  default class DTOTableCustomer
{
    idtc: number;
    idtable: number;
    idcustomer: number;

   constructor(pidtc:number,pidtable:number,pcustomer:number)
   {
       this.idtc=pidtc;
       this.idtable=pidtable;  
       this.idcustomer=pcustomer;   
   }   
}