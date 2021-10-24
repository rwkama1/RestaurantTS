"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetCustomer = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayCustomer_1 = require("../../business_class/array/LArrayCustomer");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetCustomer {
    static getLSortCustomers = async () => {
        let datac = await this.getLCustomers();
        let searchc = datac.getSort();
        return searchc;
    };
    static getLCustomer = async (id) => {
        let datac = await this.getLCustomers();
        let searchc = datac.search(id);
        return searchc;
    };
    static getLCustomerbyName = async (name, lastname) => {
        let datac = await this.getLCustomers();
        let searchc = datac.searchbyname(name, lastname);
        return searchc;
    };
    static getCustomerbyExpresion = async (exp) => {
        let datac = await this.getLCustomers();
        let searchc = datac.searchbynameExpression(exp);
        return searchc;
    };
    static getLCustomers = async () => {
        let arrayc = [];
        let datac = await FactoryData_1.FactoryData.getDataCustomer().getCustomers();
        for (let dtc of datac) {
            const logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLCustomer(dtc);
            arrayc.push(logicc);
        }
        let arraylogicc = new LArrayCustomer_1.ArrayCustomer(arrayc);
        return arraylogicc;
    };
}
exports.LGetCustomer = LGetCustomer;
//# sourceMappingURL=LGetsCustomer.js.map