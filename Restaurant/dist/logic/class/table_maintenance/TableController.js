"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCUTable_1 = require("./maintenance/LCUTable");
const LGetTable_1 = require("./maintenance/LGetTable");
class TableController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!TableController.instancia) {
            TableController.instancia = new TableController();
        }
        return TableController.instancia;
    }
    //******************** REGISTER ************** */
    registerTable = async () => {
        let add = await LCUTable_1.LCUTable.getInstance().registerTable();
        return add;
    };
    //******************** UPDATE  ************** */
    listBusyTables = async () => {
        let table = await LCUTable_1.LCUTable.getInstance().listBusyTables();
        return table;
    };
    selectTable = async (id) => {
        let table = await LCUTable_1.LCUTable.getInstance().selectTable(id);
        return table;
    };
    enableTable = async () => {
        let table = await LCUTable_1.LCUTable.getInstance().enableTable();
        return table;
    };
    disableTable = async () => {
        let table = await LCUTable_1.LCUTable.getInstance().disableTable();
        return table;
    };
    //********************* GETS ***************** */
    getLAvailableTables = async () => {
        let gettable = await LGetTable_1.LGetTable.getLAvailableTables();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTable(gettable);
        return arraydto;
    };
    getLBusyTables = async () => {
        let gettable = await LGetTable_1.LGetTable.getLBusyTables();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTable(gettable);
        return arraydto;
    };
    getLTable = async (id) => {
        let gettable = await LGetTable_1.LGetTable.getLTable(id);
        return gettable.getDTO();
    };
    getLTables = async () => {
        let gettable = await LGetTable_1.LGetTable.getLTables();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTable(gettable.arrayt);
        return arraydto;
    };
}
exports.TableController = TableController;
//# sourceMappingURL=TableController.js.map