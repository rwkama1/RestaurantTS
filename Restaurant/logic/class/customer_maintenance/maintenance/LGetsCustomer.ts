import { FactoryData } from "../../../../data/FactoryData";
import { ArrayCustomer } from "../../business_class/array/LArrayCustomer";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetCustomer{

      static getLSortCustomers=async()=>
    {
      let datac= await this.getLCustomers();
      let searchc=datac.getSort();
      return searchc
      }
      static getLCustomer=async(idcard:string)=>
      {
        let datac= await this.getLCustomers();
        let searchc=datac.search(idcard);
        return searchc
      }
      static getLCustomerbyName=async(name:string,lastname:string)=>
      {
        let datac= await this.getLCustomers();
        let searchc=datac.searchbyname(name,lastname);
        return searchc
      }
      static getLCustomers=async()=>
      {
      let arrayc=[];
        let datac= await FactoryData.getDataCustomer().getCustomers();
        for(let dtc of datac)
        {
        const logicc=InstanceLogicClass.instanceLCustomer(dtc);
        arrayc.push(logicc);
        }
      let arraylogicc=new ArrayCustomer(arrayc);
      return arraylogicc; 
      }
     
    
  }