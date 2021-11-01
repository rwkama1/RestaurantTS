import LogicBill from "../LBill";

export class ArrayBill{
    
    arraybill: LogicBill[];
    
    constructor(parraybill:LogicBill[])
       {
        this.arraybill=parraybill;
       }
     
    search=(id:number)=>
    {
    let listb=this.arraybill;
    for(let bill of listb)
      {
        if(id===bill.idbill)
        {
          return bill;
        }
      }
      return null;
    }

    // getSort=()=>
    // {
    //   let listc=this.arraycat
    //  const sortarray=listc.sort((a, b) => a.name.localeCompare(b.name));
    //  return sortarray
    // }
}