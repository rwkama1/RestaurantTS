import { FactoryData } from "../../../../data/FactoryData";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicTable from "../../business_class/LTable";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";

import { LGetTable } from "./LGetTable";

export class LCUTable {

    private static instancia: LCUTable;
    private constructor() { }
    public static getInstance(): LCUTable {
        if (!LCUTable.instancia) {
            LCUTable.instancia = new LCUTable();
        }
  
        return LCUTable.instancia;
    }
    private _tableobj: LogicTable;

    public get tableobj(): LogicTable {
        return this._tableobj;
    }
    public set tableobj(value: LogicTable) {
        this._tableobj = value;
    }

    //******************** REGISTER ************** */

    registerTable=async()=>
    {
        let add=await FactoryData.getDataTable().registerTable();
        return add;
    }

     //******************** UPDATE  ************** */

    listBusyTables=async()=>
    {
        let list=await LGetTable.getLBusyTables();
        let arraydto=InstanceArrayDTO.instanceArrayTable(list);
        return arraydto
        
    }
    selectTable=async(id:number)=>
    {
        let search=await LGetTable.getLTable(id);
        if (search===null) {
            throw new LogicException("That Table does not exists in the system");

        }
        this.tableobj=search;
        return search.getDTO()
    }  
    enableTable=async()=>
    {
        this.tableobj.statetable="Available";
        let add=await FactoryData.getDataTable().changeState(this.tableobj.getDTO());
        return add;

    }
    disableTable=async()=>
    {
        this.tableobj.statetable="Busy";
        let add=await FactoryData.getDataTable().changeState(this.tableobj.getDTO());
        return add;

    }

}