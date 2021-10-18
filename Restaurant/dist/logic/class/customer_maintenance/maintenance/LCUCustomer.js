"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUCustomer = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetsCustomer_1 = require("./LGetsCustomer");
class LCUCustomer {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUCustomer.instancia) {
            LCUCustomer.instancia = new LCUCustomer();
        }
        return LCUCustomer.instancia;
    }
    _customerobj;
    get customerobj() {
        return this._customerobj;
    }
    set customerobj(value) {
        this._customerobj = value;
    }
    listCustomers = async () => {
        let customers = await LGetsCustomer_1.LGetCustomer.getLSortCustomers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(customers);
        return arraydto;
    };
    getCustomersbyName = async (name, lastname) => {
        let customer = await LGetsCustomer_1.LGetCustomer.getLCustomerbyName(name, lastname);
        return customer.getDTO();
    };
    selectCustomer = async (idcard) => {
        let customer = await LGetsCustomer_1.LGetCustomer.getLCustomer(idcard);
        if (customer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        this.customerobj = customer;
        return this.customerobj.getDTO();
    };
    updateCustomer = async (dtc) => {
        if (this.customerobj != null) {
            let datadtc = await this.customerobj.update(dtc);
            const updc = await FactoryData_1.FactoryData.getDataCustomer().updateCustomer(datadtc);
            return updc;
        }
        else {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
    };
    //***************************************************** */
    registerCustomer = async (dtc) => {
        let logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLCustomer(dtc);
        let custs = await LGetsCustomer_1.LGetCustomer.getLCustomer(dtc.idcard);
        if (custs != null) {
            throw new logicexception_1.LogicException("That Customer already exists in the system");
        }
        let datac = await logicc.register();
        const regc = await FactoryData_1.FactoryData.getDataCustomer().registerCustomer(datac);
        return regc;
    };
}
exports.LCUCustomer = LCUCustomer;
//# sourceMappingURL=LCUCustomer.js.map