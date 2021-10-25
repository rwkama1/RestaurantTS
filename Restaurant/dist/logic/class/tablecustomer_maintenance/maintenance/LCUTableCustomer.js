"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUTableCustomer = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LTableCustomer_1 = require("../../business_class/LTableCustomer");
const LCUCustomer_1 = require("../../customer_maintenance/maintenance/LCUCustomer");
const LGetsCustomer_1 = require("../../customer_maintenance/maintenance/LGetsCustomer");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const LGetTable_1 = require("../../table_maintenance/maintenance/LGetTable");
const LGetTableCustomer_1 = require("./LGetTableCustomer");
class LCUTableCustomer {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUTableCustomer.instancia) {
            LCUTableCustomer.instancia = new LCUTableCustomer();
        }
        return LCUTableCustomer.instancia;
    }
    _customertableobj;
    get customertableobj() {
        return this._customertableobj;
    }
    set customertableobj(value) {
        this._customertableobj = value;
    }
    //********************** ADD WITHOUT PREVIOUS RESERVATION ******** */
    registerCustomer = async (dtc) => {
        let addc = await LCUCustomer_1.LCUCustomer.getInstance().registerCustomer(dtc);
        return addc;
    };
    //********************** ADD WITH PREVIOUS RESERVATION ************ */
    listCustomers = async () => {
        let customers = await LGetsCustomer_1.LGetCustomer.getLCustomers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(customers.arraycustomer);
        return arraydto;
    };
    getCustomerbyExpresion = async (exp) => {
        let customers = await LGetsCustomer_1.LGetCustomer.getCustomerbyExpresion(exp);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(customers);
        return arraydto;
    };
    enterCustomer = async (id) => {
        let newtc = new LTableCustomer_1.default(0, null, null);
        this.customertableobj = newtc;
        let customer = await LGetsCustomer_1.LGetCustomer.getLCustomer(id);
        if (customer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        let tablecustomerbyid = await LGetTableCustomer_1.LGetTableCustomer.getLTCbyCustomerId(id);
        if (tablecustomerbyid != null) {
            throw new logicexception_1.LogicException("That Customer already has a table");
        }
        this.customertableobj.customer = customer;
        return this.customertableobj.customer.getDTO();
    };
    listAvailableTable = async () => {
        let tables = await LGetTable_1.LGetTable.getLAvailableTables();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTable(tables);
        return arraydto;
    };
    enterTable = async (id) => {
        let table = await LGetTable_1.LGetTable.getLTable(id);
        if (table === null) {
            throw new logicexception_1.LogicException("The Table does not exists in the system");
        }
        if (table.statetable === "Busy") {
            throw new logicexception_1.LogicException("That Table is Busy");
        }
        this.customertableobj.table = table;
        return this.customertableobj.table.getDTO();
    };
    registerTableCustomer = async () => {
        this.customertableobj.idtc = 0;
        this.customertableobj.table.statetable = "Busy";
        let dto = this.customertableobj.getDTO();
        let addtc = await FactoryData_1.FactoryData.getDataTableCustomer().registerTableCustomer(dto);
        if (addtc === true) {
            let changestate = await FactoryData_1.FactoryData.getDataTable().changeState(this.customertableobj.table.getDTO());
            return changestate;
        }
    };
    //************************** DELETE  ****************************** */
    getLTCSortbyCustomer = async () => {
        let customers = await LGetTableCustomer_1.LGetTableCustomer.getLSortbyCustomer();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTableCustomer(customers);
        return arraydto;
    };
    selectTableCustomer = async (id) => {
        let tc = await LGetTableCustomer_1.LGetTableCustomer.getLTableC(id);
        if (tc === null) {
            throw new logicexception_1.LogicException("The Table Customer does not exists in the system");
        }
        this.customertableobj = tc;
        return this.customertableobj.getDTO();
    };
    deleteTableCustomer = async () => {
        this.customertableobj.table.statetable = "Available";
        let dto = this.customertableobj.getDTO();
        let deltc = await FactoryData_1.FactoryData.getDataTableCustomer().deleteTableCustomer(dto);
        if (deltc === true) {
            let availablet = await FactoryData_1.FactoryData.getDataTable().changeState(this.customertableobj.table.getDTO());
            return availablet;
        }
    };
}
exports.LCUTableCustomer = LCUTableCustomer;
//# sourceMappingURL=LCUTableCustomer.js.map