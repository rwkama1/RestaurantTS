import ITableController from "../../interfaces/ITableController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { LCUTable } from "./maintenance/LCUTable";
import { LGetTable } from "./maintenance/LGetTable";

export class TableController implements ITableController{

    private static instancia: TableController;
    private constructor() { }
    public static getInstance(): TableController {
        if (!TableController.instancia) {
            TableController.instancia = new TableController();
        }

        return TableController.instancia;
    }
      //******************** REGISTER ************** */

      registerTable=async()=>
      {
          let add=await LCUTable.getInstance().registerTable();
          return add;
      }
  
       //******************** UPDATE  ************** */
  
      listBusyTables=async()=>
      {
        let table=await LCUTable.getInstance().listBusyTables();
        return table;
          
      }
      selectTable=async(id:number)=>
      {
        let table=await LCUTable.getInstance().selectTable(id);
        return table;
      }  
      enableTable=async()=>
      { 
          let table=await LCUTable.getInstance().enableTable();
        return table;
  
      }
      disableTable=async()=>
      {
        let table=await LCUTable.getInstance().disableTable();
        return table;
  
      }

      //********************* GETS ***************** */
      
      getLAvailableTables=async()=>
        {
        let gettable=await LGetTable.getLAvailableTables();
        let arraydto=InstanceArrayDTO.instanceArrayTable(gettable);
        return arraydto
        }
      getLBusyTables=async()=>
        {
        let gettable=await LGetTable.getLBusyTables();
        let arraydto=InstanceArrayDTO.instanceArrayTable(gettable);
        return arraydto
        }
     getLTable=async(id:number)=>
      {
        let gettable=await LGetTable.getLTable(id);
        return gettable.getDTO()
      }
     getLTables=async()=>
      {
        let gettable=await LGetTable.getLTables();
        let arraydto=InstanceArrayDTO.instanceArrayTable(gettable.arrayt);
        return arraydto
      }

  
}