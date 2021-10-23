import LogicCustomer from "../LCustomer";

export class ArrayCustomer{
    
    arraycustomer: LogicCustomer[];
    
    constructor(parraycustomer:LogicCustomer[])
       {
        this.arraycustomer=parraycustomer;
       }
     
    search=(id:number)=>
    {
    let listc=this.arraycustomer;
    for(let c of listc)
      {
        if(id===c.id)
        {
          return c;
        }
      }
      return null;
    }
    searchbyname=(name:string,lastname:string)=>
    { 
      let listc=this.arraycustomer;
      for(let customer of listc)
      {
       
        if(customer.name===name||customer.lastname===lastname)
        {
          return customer;
        }
      }
      return null;
    }
    getSort=()=>
    {
      let listc=this.arraycustomer
     const sortarray=listc.sort((a, b) => a.name.localeCompare(b.name));
     return sortarray
    }
}