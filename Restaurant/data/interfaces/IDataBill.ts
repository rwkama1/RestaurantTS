import DTOBill from "../../shared/entity/DTOBill";

export default interface IDataBill 
{
    registerBill(dtobill:DTOBill):Promise<boolean>;
    updateState(dtobill:DTOBill):Promise<boolean>;
    getBills():Promise<DTOBill[]>;
    //  registerCategory(dtocat:DTOCategory):Promise<boolean>;
    //  updateCategory(dtocat:DTOCategory):Promise<boolean>;
}