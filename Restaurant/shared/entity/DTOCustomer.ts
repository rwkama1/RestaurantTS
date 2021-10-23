export  default class DTOCustomer
{
    id: number;
    name: string;
    lastname: string;
  
    
   constructor(pid:number,pname:string,plastname:string)
   {
       this.id=pid;
       this.name=pname;
       this.lastname=plastname;
      
   }
      
}