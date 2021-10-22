export  default class DTOTableCustomer
{
    idtc: number;
    idtable: number;
    idcardcustomer: string;

   constructor(pidtc:number,pidtable:number,pidcardcustomer:string)
   {
       this.idtc=pidtc;
       this.idtable=pidtable;  
       this.idcardcustomer=pidcardcustomer;   
   }   
}