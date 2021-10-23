"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUCustomer = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LCUCustomer {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUCustomer.instancia) {
            LCUCustomer.instancia = new LCUCustomer();
        }
        return LCUCustomer.instancia;
    }
    registerCustomer = async (dtc) => {
        let logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLCustomer(dtc);
        let datac = await logicc.getDTO();
        const regc = await FactoryData_1.FactoryData.getDataCustomer().registerCustomer(datac);
        return regc;
    };
}
exports.LCUCustomer = LCUCustomer;
//# sourceMappingURL=LCUCustomer.js.map