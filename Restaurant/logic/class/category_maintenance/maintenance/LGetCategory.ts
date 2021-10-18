import { FactoryData } from "../../../../data/FactoryData";
import { ArrayCategories } from "../../business_class/array/LArrayCategory";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetCategory
{
    static getLSortCategories=async()=>
    {
      let datac= await this.getLCategories();
      let searchc=datac.getSort();
      return searchc
      }
    static getLCategory=async(name:string)=>
      {
        let datac= await this.getLCategories();
        let searchc=datac.search(name);
        return searchc
      }
     
    static getLCategories=async()=>
      {
      let arrayc=[];
        let datac= await FactoryData.getDataCategory().getCategories();
        for(let dtc of datac)
        {
        const logicc=InstanceLogicClass.instanceLCategory(dtc);
        arrayc.push(logicc);
        }
      let arraylogicc=new ArrayCategories(arrayc);
      return arraylogicc; 
      }

}