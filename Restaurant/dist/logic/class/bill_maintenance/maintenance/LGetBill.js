"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetBill = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayBill_1 = require("../../business_class/array/LArrayBill");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetBill {
    static getLBill = async (id) => {
        let datac = await this.getLBills();
        let searchc = datac.search(id);
        return searchc;
    };
    static getLBillbyOrder = async (id) => {
        let datac = await this.getLBills();
        let searchc = datac.searchbyOrder(id);
        return searchc;
    };
    static getLBillbyCustomer = async (name) => {
        let datac = await this.getLBills();
        let searchc = datac.searchbyCustomer(name);
        return searchc;
    };
    static getLBillbyDates = async (date1, date2) => {
        let datac = await this.getLBills();
        let searchc = datac.searchbyDates(date1, date2);
        return searchc;
    };
    static getLBills = async () => {
        let arrayb = [];
        let logicc;
        let datab = await FactoryData_1.FactoryData.getDataBill().getBills();
        for (let dtc of datab) {
            logicc = await instanceBusinessClass_1.InstanceLogicClass.instanceLBill(dtc);
            arrayb.push(logicc);
        }
        let arraylogicc = new LArrayBill_1.ArrayBill(arrayb);
        return arraylogicc;
    };
}
exports.LGetBill = LGetBill;
//# sourceMappingURL=LGetBill.js.map