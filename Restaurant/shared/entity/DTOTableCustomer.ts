import DTOCustomer from "./DTOCustomer";

export  default class DTOTableCustomer
{
    idtc: number;
    idtable: number;
    customer: DTOCustomer;

   constructor(pidtc:number,pidtable:number,pcustomer:DTOCustomer)
   {
       this.idtc=pidtc;
       this.idtable=pidtable;  
       this.customer=pcustomer;   
   }   
}