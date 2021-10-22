import { FactoryData } from "../../../../data/FactoryData";
import { ArrayTable } from "../../business_class/array/LArrayTable";
import LogicTable from "../../business_class/LTable";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetTable
{
    static getLAvailableTables=async()=>
    {
      let datac= await this.getLTables();
      let searchc=datac.getAvailable();
      return searchc
     }
    static getLBusyTables=async()=>
     {
       let datac= await this.getLTables();
       let searchc=datac.getBusy();
       return searchc
      }
    static getLTable=async(id:number)=>
     {
       let datac= await this.getLTables();
       let searchc=datac.search(id);
       return searchc
      }
    static getLTables=async()=>
      {
        let arrayt:LogicTable[]=[];
        let datac= await FactoryData.getDataTable().getTables();
        for(let dtc of datac)
        {
            const logicc=InstanceLogicClass.instanceLTable(dtc);
            arrayt.push(logicc);
        }
      let arraylogicc=new ArrayTable(arrayt);
      return arraylogicc; 
      }

}