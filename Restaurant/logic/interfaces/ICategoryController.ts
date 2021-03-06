import DTOCategory from "../../shared/entity/DTOCategory";

export default interface ICategoryController 
{
   
     //************ MAINTENANCE ********************** */

     listCategories():Promise<any[]>;
     selectCategory(name:string):Promise<DTOCategory>;
     updateCategory(desc:string):Promise<boolean>;
     registerCategory(dtc:DTOCategory):Promise<boolean>;
         
     //********************* GETS ************************ */
     
     getLSortCategories():Promise<any[]>;
     getLCategory(name:string):Promise<DTOCategory>;
     getLCategories():Promise<any[]>;
    
}