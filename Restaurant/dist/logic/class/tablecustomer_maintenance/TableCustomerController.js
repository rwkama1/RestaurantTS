"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCustomerController = void 0;
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCUTableCustomer_1 = require("./maintenance/LCUTableCustomer");
const LGetTableCustomer_1 = require("./maintenance/LGetTableCustomer");
class TableCustomerController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!TableCustomerController.instancia) {
            TableCustomerController.instancia = new TableCustomerController();
        }
        return TableCustomerController.instancia;
    }
    //********************** ADD WITHOUT PREVIOUS RESERVATION ******** */
    registerCustomer = async (dtc) => {
        let addc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().registerCustomer(dtc);
        return addc;
    };
    //********************** ADD WITH PREVIOUS RESERVATION ************ */
    listCustomers = async () => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().listCustomers();
        return tlc;
    };
    getCustomerbyExpresion = async (exp) => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().getCustomerbyExpresion(exp);
        return tlc;
    };
    enterCustomer = async (id) => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().enterCustomer(id);
        return tlc;
    };
    listAvailableTable = async () => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().listAvailableTable();
        return tlc;
    };
    enterTable = async (id) => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().enterTable(id);
        return tlc;
    };
    registerTableCustomer = async () => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().registerTableCustomer();
        return tlc;
    };
    //************************** DELETE  ****************************** */
    getLTCSortbyCustomer = async () => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().getLTCSortbyCustomer();
        return tlc;
    };
    selectTableCustomer = async (id) => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().selectTableCustomer(id);
        return tlc;
    };
    deleteTableCustomer = async () => {
        let tlc = await LCUTableCustomer_1.LCUTableCustomer.getInstance().deleteTableCustomer();
        return tlc;
    };
    //********************* GETS ***************************************** */
    getLTableC = async (id) => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLTableC(id);
        return gettlc.getDTO();
    };
    getLTCbyCustomer = async (name, lastname) => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLTCbyCustomer(name, lastname);
        return gettlc.getDTO();
    };
    getLTCbyTable = async (id) => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLTCbyTable(id);
        return gettlc.getDTO();
    };
    getLSortbyCustomer = async () => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLSortbyCustomer();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTableCustomer(gettlc);
        return arraydto;
    };
    getLSortbyTable = async () => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLSortbyTable();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTableCustomer(gettlc);
        return arraydto;
    };
    getLTablesCustomers = async () => {
        let gettlc = await LGetTableCustomer_1.LGetTableCustomer.getLTablesCustomers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayTableCustomer(gettlc.arraytc);
        return arraydto;
    };
}
exports.TableCustomerController = TableCustomerController;
//# sourceMappingURL=TableCustomerController.js.map