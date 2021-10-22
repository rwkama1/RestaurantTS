"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUTable = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const LGetTable_1 = require("./LGetTable");
class LCUTable {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUTable.instancia) {
            LCUTable.instancia = new LCUTable();
        }
        return LCUTable.instancia;
    }
    _tableobj;
    get tableobj() {
        return this._tableobj;
    }
    set tableobj(value) {
        this._tableobj = value;
    }
    //******************** REGISTER ************** */
    registerTable = async () => {
        let add = await FactoryData_1.FactoryData.getDataTable().registerTable();
        return add;
    };
    //******************** UPDATE  ************** */
    listBusyTables = async () => {
        let list = await LGetTable_1.LGetTable.getLBusyTables();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTable(list);
        return arraydto;
    };
    selectTable = async (id) => {
        let search = await LGetTable_1.LGetTable.getLTable(id);
        if (search === null) {
            throw new logicexception_1.LogicException("That Table does not exists in the system");
        }
        this.tableobj = search;
        return search.getDTO();
    };
    enableTable = async () => {
        this.tableobj.statetable = "Available";
        let add = await FactoryData_1.FactoryData.getDataTable().changeState(this.tableobj.getDTO());
        return add;
    };
    disableTable = async () => {
        this.tableobj.statetable = "Busy";
        let add = await FactoryData_1.FactoryData.getDataTable().changeState(this.tableobj.getDTO());
        return add;
    };
}
exports.LCUTable = LCUTable;
//# sourceMappingURL=LCUTable.js.map