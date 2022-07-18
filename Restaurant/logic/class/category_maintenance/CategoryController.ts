import DTOCategory from "../../../shared/entity/DTOCategory";
import { LogicException } from "../../../shared/exceptions/logicexception";
import ICategoryController from "../../interfaces/ICategoryController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCUCategory } from "./maintenance/LCUCategory";
import { LGetCategory } from "./maintenance/LGetCategory";

export class CategoryController implements ICategoryController{

    private static instancia: CategoryController;
    private constructor() { }
    public static getInstance(): CategoryController {
        if (!CategoryController.instancia) {
            CategoryController.instancia = new CategoryController();
        }

        return CategoryController.instancia;
 }
//#region Maintenance



     listCategories=async()=>
     {
         let categories= await LCUCategory.getInstance().listCategory();
         return categories
     }
     selectCategory=async(name:string)=>
     {
        let cat= await LCUCategory.getInstance().selectCategory(name);
       return cat
         
     }
     updateCategory=async(desc:string)=>
      {
         let cat= await LCUCategory.getInstance().updateCategory(desc);
        return cat
   
      }
     registerCategory=async(dtc:DTOCategory)=>
          {
           
         let cat= await LCUCategory.getInstance().registerCategory(dtc);
         return cat
   
          }
  //#endregion

//#region Gets
getLSortCategories=async()=>
{
    let categories= await LGetCategory.getLSortCategories();
    let arraydto=InstanceArrayDTO.instanceArrayCategory(categories);
    return arraydto
}
getLCategory=async(name:string)=>
{
   let cat= await LGetCategory.getLCategory(name);
   if(cat===null)
   {
       throw new LogicException("The Category does not exists in the system");
       
   }
  return cat.getDTO()
    
}
getLCategories=async()=>
 {
    let cate= await LGetCategory.getLCategories();
    let arraydto=InstanceArrayDTO.instanceArrayCategory(cate.arraycat);
    return arraydto

 }
//#endregion
   
     
}