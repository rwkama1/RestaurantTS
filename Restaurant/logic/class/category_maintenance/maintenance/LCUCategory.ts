import { FactoryData } from "../../../../data/FactoryData";
import DTOCategory from "../../../../shared/entity/DTOCategory";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicCategory from "../../business_class/LCategory";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetCategory } from "./LGetCategory";

export class LCUCategory {

    private static instancia: LCUCategory;
    private constructor() { }
    public static getInstance(): LCUCategory {
        if (!LCUCategory.instancia) {
            LCUCategory.instancia = new LCUCategory();
        }
  
        return LCUCategory.instancia;
    }
    
    private _categoryobj: LogicCategory;

    public get categoryobj(): LogicCategory {
        return this._categoryobj;
    }
    public set categoryobj(value: LogicCategory) {
        this._categoryobj = value;
    }
   
    listCategory=async()=>
    {
        let cs= await LGetCategory.getLSortCategories();
        let arraydto=InstanceArrayDTO.instanceArrayCategory(cs);
        return arraydto
    }
    selectCategory=async(name:string)=>
    {
      let cat= await LGetCategory.getLCategory(name);
      if(cat===null)
      {
        throw new LogicException("The Category does not exists in the system");
      }
      this.categoryobj=cat;
      return this.categoryobj.getDTO()
        
    }
    updateCategory=async(description:string)=>
         {
          if(this.categoryobj!=null)
           {
            let datacat=await this.categoryobj.update(description);
            const updc=await FactoryData.getDataCategory().updateCategory(datacat);
            return updc;
           }
           else
           {
             throw new LogicException("The Category does not exists in the system");
             
           }
  
         }
       
    //***************************************************** */
  
     registerCategory=async(dtc:DTOCategory)=>
         {
              let logicc=InstanceLogicClass.instanceLCategory(dtc);
              let cat = await LGetCategory.getLCategory(dtc.name);
              if(cat!=null)
              {
                throw new LogicException("That Category already exists in the system");
                
              }
              let datac=await logicc.register();
              const regc=await FactoryData.getDataCategory().registerCategory(datac);
              return regc;
  
         } 
      
    }