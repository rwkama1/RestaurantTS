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
    searchbyOrder=(id:number)=>
    {
    let listb=this.arraybill;
    for(let bill of listb)
      {
        if(id===bill.lorder.idorder)
        {
          return bill;
        }
      }
      return null;
    }
    searchbyCustomer=(name:string)=>
    {
      let listb=this.arraybill;
      let newarray:LogicBill[]=[];
      for(let bill of listb)
        {
          if(bill.lorder.customer.name.match(name))
          {
            newarray.push(bill);
          }
        }
        return newarray;
    }

    // getSort=()=>
    // {
    //   let listc=this.arraycat
    //  const sortarray=listc.sort((a, b) => a.name.localeCompare(b.name));
    //  return sortarray
    // }
}