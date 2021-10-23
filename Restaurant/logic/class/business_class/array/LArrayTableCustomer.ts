import LogicTableCustomer from "../LTableCustomer";

export class ArrayTableCustomer{

    arraytc: LogicTableCustomer[];

    constructor(parratc:LogicTableCustomer[])
       {
        this.arraytc=parratc;
       }
     
    search=(idtc:number)=>
    {
    for(let tablec of this.arraytc)
      {
        if(idtc===tablec.idtc)
        {
          return tablec;
        }
      }
      return null;
    }
    searchbyTable=(idt:number)=>
    {
    for(let tablec of this.arraytc)
      {
        if(idt===tablec.table.idtable)
        {
          return tablec;
        }
      }
      return null;
    }
    searchbyCustomer=(name:string,lastname:string)=>
    {
    for(let tablec of this.arraytc)
      {
        if(name===tablec.customer.name||lastname===tablec.customer.lastname)
        {
          return tablec;
        }
      }
      return null;
    }

    //*************************** */

    getSortbyCustomer=()=>
    {
    
     const sortarray=this.arraytc.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
     return sortarray
    }
    getSortbyTable=()=>
    {
    
     const sortarray=this.arraytc.sort((a, b) => a.table.idtable-b.table.idtable);
     return sortarray
    }
}