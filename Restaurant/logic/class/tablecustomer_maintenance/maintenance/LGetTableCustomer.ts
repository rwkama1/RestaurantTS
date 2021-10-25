import { FactoryData } from "../../../../data/FactoryData";
import { ArrayTableCustomer } from "../../business_class/array/LArrayTableCustomer";
import LogicTableCustomer from "../../business_class/LTableCustomer";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetTableCustomer
{

   
    static getLTableC=async(id:number)=>
    {
      let datatc= await this.getLTablesCustomers();
      let searchtc=datatc.search(id);
        return searchtc
    }
    
    static getLTCbyCustomer=async(name:string,lastname:string)=>
    {
      let datatc= await this.getLTablesCustomers();
      let searchtc=datatc.searchbyCustomer(name,lastname);
        return searchtc
    }
    static getLTCbyCustomerId=async(id:number)=>
    {
      let datatc= await this.getLTablesCustomers();
      let searchtc=datatc.searchbyCustomerId(id);
        return searchtc
    }
    
    static getLTCbyTable=async(id:number)=>
    {
      let datatc= await this.getLTablesCustomers();
      let searchtc=datatc.searchbyTable(id);
        return searchtc
    }
  
   
    static getLSortbyCustomer=async()=>
    {
        let datatc= await this.getLTablesCustomers();
        let searchtc=datatc.getSortbyCustomer();
        return searchtc
    } 
    static getLSortbyTable=async()=>
    {
        let datatc= await this.getLTablesCustomers();
        let searchtc=datatc.getSortbyTable();
        return searchtc
    } 
    static getLTablesCustomers=async()=>
    {
    let arrayltc:LogicTableCustomer[]=[];
    let datatc= await FactoryData.getDataTableCustomer().getTableCustomer();
      for(var dtotc of datatc)
      {
      const logictc=await InstanceLogicClass.instanceLTableCustomer(dtotc);
      arrayltc.push(logictc);
      }
    let arraylogictc=new ArrayTableCustomer(arrayltc);
    return arraylogictc; 
    }
}