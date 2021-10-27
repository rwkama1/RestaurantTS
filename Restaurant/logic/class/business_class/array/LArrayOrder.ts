import LogicOrder from "../LOrder";

export class ArrayOrder
{
    arrayorder: LogicOrder[];
    constructor(parrayorder:LogicOrder[])
    {
     this.arrayorder=parrayorder;
    }
    search=(id:number)=>
    {
        for(let order of this.arrayorder)
        {
            if(id===order.idorder)
            {
            return order;
            }
        }
      return null;
    }
    searchbyCustomer=(id:number)=>
    {
        for(let order of this.arrayorder)
        {
            if(id===order.customer.id)
            {
            return order;
            }
        }
      return null;
    }
    searchbyCustomerExp=(exp:string)=>
    {
        let arraylo:LogicOrder[]=[];
        for(let order of this.arrayorder)
        {
            if(order.customer.name.match(exp)||order.customer.lastname.match(exp))
            {
             arraylo.push(order); 
            }
        }
      return arraylo;
    }

    //********************************************************** */
    
    sortbyCustomerName=()=>
    {
     const sortarray=this.arrayorder.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
     return sortarray
    }
    sortbyNumberPeople=()=>
    {
     const sortarray=this.arrayorder.sort((a, b) => b.numberpeople-a.numberpeople);
     return sortarray
    }
    getPendingOrders=()=>
    {
      let newarray:LogicOrder[]=[];
      for(let order of this.arrayorder)
      {
          if(order.stateorder==="Pending")
           {
            newarray.push(order);
           }
      }
    return newarray;
    }
    getConfirmedOrders=()=>
    {
      let newarray:LogicOrder[]=[];
      for(let order of this.arrayorder)
      {
          if(order.stateorder==="Confirmed")
           {
            newarray.push(order);
           }
      }
    return newarray;
    }
    getCashedOrders=()=>
    {
      let newarray:LogicOrder[]=[];
      for(let order of this.arrayorder)
      {
          if(order.stateorder==="Cashed")
           {
            newarray.push(order);
           }
      }
    return newarray;
    }
    getCanceledOrders=()=>
    {
      let newarray:LogicOrder[]=[];
      for(let order of this.arrayorder)
      {
          if(order.stateorder==="Canceled")
           {
            newarray.push(order);
           }
      }
    return newarray;
    }
  
}