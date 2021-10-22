"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetTable = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayTable_1 = require("../../business_class/array/LArrayTable");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetTable {
    static getLAvailableTables = async () => {
        let datac = await this.getLTables();
        let searchc = datac.getAvailable();
        return searchc;
    };
    static getLBusyTables = async () => {
        let datac = await this.getLTables();
        let searchc = datac.getBusy();
        return searchc;
    };
    static getLTable = async (id) => {
        let datac = await this.getLTables();
        let searchc = datac.search(id);
        return searchc;
    };
    static getLTables = async () => {
        let arrayt = [];
        let datac = await FactoryData_1.FactoryData.getDataTable().getTables();
        for (let dtc of datac) {
            const logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLTable(dtc);
            arrayt.push(logicc);
        }
        let arraylogicc = new LArrayTable_1.ArrayTable(arrayt);
        return arraylogicc;
    };
}
exports.LGetTable = LGetTable;
//# sourceMappingURL=LGetTable.js.map