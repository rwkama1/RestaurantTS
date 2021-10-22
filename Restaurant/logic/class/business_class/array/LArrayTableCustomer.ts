import LogicTableCustomer from "../LTableCustomer";

export class ArrayTableCustomer{

    arraytc: LogicTableCustomer[];

    constructor(parratc:LogicTableCustomer[])
       {
        this.arraytc=parratc;
       }
     
    // search=(name:string)=>
    // {
    // let listc=this.arraycat;
    // for(let c of listc)
    //   {
    //     if(name===c.name)
    //     {
    //       return c;
    //     }
    //   }
    //   return null;
    // }

    // getSort=()=>
    // {
    //   let listc=this.arraycat
    //  const sortarray=listc.sort((a, b) => a.name.localeCompare(b.name));
    //  return sortarray
    // }
}