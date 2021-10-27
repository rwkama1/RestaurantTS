import { FactoryData } from "../../../../data/FactoryData";
import { ArrayOrder } from "../../business_class/array/LArrayOrder";
import LogicOrder from "../../business_class/LOrder";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetOrders 
{

    static getLOrder=async(id:number)=>
    {
      let dataorder= await this.getLOrders();
      let searcho=dataorder.search(id);
      return searcho
     }
    static searchbyCustomer=async(id:number)=>
    {
      let dataorder= await this.getLOrders();
      let searcho=dataorder.searchbyCustomer(id);
      return searcho
     }
    static searchbyCustomerExp=async(exp:string)=>
    {
      let dataorder= await this.getLOrders();
      let searcho=dataorder.searchbyCustomerExp(exp);
      return searcho
     }

//********************************************************** */

    static sortbyCustomerName=async()=>
    {
      let dataorder= await this.getLOrders();
      let searcho=dataorder.sortbyCustomerName();
      return searcho
     }
    static sortbyNumberPeople=async()=>
     {
       let dataorder= await this.getLOrders();
       let searcho=dataorder.sortbyNumberPeople();
       return searcho
      }
    static getPendingOrders=async()=>
      {
        let dataorder= await this.getLOrders();
        let searcho=dataorder.getPendingOrders();
        return searcho
       }
    static getConfirmedOrders=async()=>
       {
         let dataorder= await this.getLOrders();
         let searcho=dataorder.getConfirmedOrders();
         return searcho
        }
    static getCashedOrders=async()=>
        {
          let dataorder= await this.getLOrders();
          let searcho=dataorder.getCashedOrders();
          return searcho
         }
    static getCanceledOrders=async()=>
        {
        let dataorder= await this.getLOrders();
        let searcho=dataorder.getCanceledOrders();
        return searcho
        }
    static getLOrders=async()=>
    {
        let arrayo:LogicOrder[]=[];
        let datao= await FactoryData.getDataOrder().getOrders();
        for(let dtoo of datao)
        {
            const logico=await InstanceLogicClass.instanceLOrder(dtoo);
            arrayo.push(logico);
        }
        let arraylogic=new ArrayOrder(arrayo);
        return arraylogic; 
    }

}