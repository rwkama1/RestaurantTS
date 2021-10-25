"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetTableCustomer = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayTableCustomer_1 = require("../../business_class/array/LArrayTableCustomer");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetTableCustomer {
    static getLTableC = async (id) => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.search(id);
        return searchtc;
    };
    static getLTCbyCustomer = async (name, lastname) => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.searchbyCustomer(name, lastname);
        return searchtc;
    };
    static getLTCbyCustomerId = async (id) => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.searchbyCustomerId(id);
        return searchtc;
    };
    static getLTCbyTable = async (id) => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.searchbyTable(id);
        return searchtc;
    };
    static getLSortbyCustomer = async () => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.getSortbyCustomer();
        return searchtc;
    };
    static getLSortbyTable = async () => {
        let datatc = await this.getLTablesCustomers();
        let searchtc = datatc.getSortbyTable();
        return searchtc;
    };
    static getLTablesCustomers = async () => {
        let arrayltc = [];
        let datatc = await FactoryData_1.FactoryData.getDataTableCustomer().getTableCustomer();
        for (var dtotc of datatc) {
            const logictc = await instanceBusinessClass_1.InstanceLogicClass.instanceLTableCustomer(dtotc);
            arrayltc.push(logictc);
        }
        let arraylogictc = new LArrayTableCustomer_1.ArrayTableCustomer(arrayltc);
        return arraylogictc;
    };
}
exports.LGetTableCustomer = LGetTableCustomer;
//# sourceMappingURL=LGetTableCustomer.js.map