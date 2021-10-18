import DTOCategory from "../../shared/entity/DTOCategory";

export default interface IDataCategory 
{
     getCategories():Promise<DTOCategory[]>; 
     registerCategory(dtocat:DTOCategory):Promise<boolean>;
     updateCategory(dtocat:DTOCategory):Promise<boolean>;
}