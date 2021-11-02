import { FactoryData } from "../../../../data/FactoryData";
import { ArrayBill } from "../../business_class/array/LArrayBill";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetBill
{
    static getLBill=async(id:number)=>
      {
        let datac= await this.getLBills();
        let searchc=datac.search(id);
        return searchc
      }
      
    static getLBillbyOrder=async(id:number)=>
    {
      let datac= await this.getLBills();
      let searchc=datac.searchbyOrder(id);
      return searchc
    }
    static getLBillbyCustomer=async(name:string)=>
    {
      let datac= await this.getLBills();
      let searchc=datac.searchbyCustomer(name);
      return searchc
    }
    static getLBillbyDates=async(date1:Date,date2:Date)=>
    {
      let datac= await this.getLBills();
      let searchc=datac.searchbyDates(date1,date2);
      return searchc
    }
    static getLBills=async()=>
    {
    let arrayb=[];
    let logicc;
    let dtc;
    let datab= await FactoryData.getDataBill().getBills();
      for( dtc of datab)
      {
       logicc=InstanceLogicClass.instanceLBill(dtc);
      arrayb.push(logicc);
      }
    let arraylogicc=new ArrayBill(arrayb);
    return arraylogicc; 
    }

}