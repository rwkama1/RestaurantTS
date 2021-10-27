"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetOrders = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayOrder_1 = require("../../business_class/array/LArrayOrder");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetOrders {
    static getLOrder = async (id) => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.search(id);
        return searcho;
    };
    static searchbyCustomer = async (id) => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.searchbyCustomer(id);
        return searcho;
    };
    static searchbyCustomerExp = async (exp) => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.searchbyCustomerExp(exp);
        return searcho;
    };
    //********************************************************** */
    static sortbyCustomerName = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.sortbyCustomerName();
        return searcho;
    };
    static sortbyNumberPeople = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.sortbyNumberPeople();
        return searcho;
    };
    static getPendingOrders = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.getPendingOrders();
        return searcho;
    };
    static getConfirmedOrders = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.getConfirmedOrders();
        return searcho;
    };
    static getCashedOrders = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.getCashedOrders();
        return searcho;
    };
    static getCanceledOrders = async () => {
        let dataorder = await this.getLOrders();
        let searcho = dataorder.getCanceledOrders();
        return searcho;
    };
    static getLOrders = async () => {
        let arrayo = [];
        let datao = await FactoryData_1.FactoryData.getDataOrder().getOrders();
        for (let dtoo of datao) {
            const logico = await instanceBusinessClass_1.InstanceLogicClass.instanceLOrder(dtoo);
            arrayo.push(logico);
        }
        let arraylogic = new LArrayOrder_1.ArrayOrder(arrayo);
        return arraylogic;
    };
}
exports.LGetOrders = LGetOrders;
//# sourceMappingURL=LGetOrders.js.map