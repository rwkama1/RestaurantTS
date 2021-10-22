import DTOTable from "../../shared/entity/DTOTable";

export default interface IDataTable 
{
    getTables():Promise<DTOTable[]>; 
     registerTable():Promise<boolean>;
     changeState(dtot:DTOTable):Promise<boolean>;
}