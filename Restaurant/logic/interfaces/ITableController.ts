import DTOTable from "../../shared/entity/DTOTable";

export default interface ITableController 
{

    //******************** REGISTER *************** */

    registerTable():Promise<boolean>;

    //********************* UPDATE **************** */

    listBusyTables():Promise<DTOTable[]>;
    selectTable(id:number):Promise<DTOTable>;
    enableTable():Promise<boolean>;
    disableTable():Promise<boolean>;

     //********************* GETS ***************** */
     
    getLAvailableTables():Promise<DTOTable[]>;
    getLBusyTables():Promise<DTOTable[]>;
    getLTable(id:number):Promise<DTOTable>;
    getLTables():Promise<DTOTable[]>;
   
    
}