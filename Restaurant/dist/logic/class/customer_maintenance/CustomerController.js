"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LAutentication_1 = require("./maintenance/LAutentication");
const LCUCustomer_1 = require("./maintenance/LCUCustomer");
const LGetsCustomer_1 = require("./maintenance/LGetsCustomer");
class CustomerController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!CustomerController.instancia) {
            CustomerController.instancia = new CustomerController();
        }
        return CustomerController.instancia;
    }
    //************ MAINTENANCE ********************** */
    listCustomers = async () => {
        let customers = await LCUCustomer_1.LCUCustomer.getInstance().listCustomers();
        return customers;
    };
    getCustomersbyName = async (name, lastname) => {
        let customer = await LCUCustomer_1.LCUCustomer.getInstance().getCustomersbyName(name, lastname);
        return customer;
    };
    selectCustomer = async (idcard) => {
        let customer = await LCUCustomer_1.LCUCustomer.getInstance().selectCustomer(idcard);
        return customer;
    };
    updateCustomer = async (dtc) => {
        let customer = await LCUCustomer_1.LCUCustomer.getInstance().updateCustomer(dtc);
        return customer;
    };
    registerCustomer = async (dtc) => {
        let customer = await LCUCustomer_1.LCUCustomer.getInstance().registerCustomer(dtc);
        return customer;
    };
    //***************** GET CUSTOMERS ***************** */
    getLSortCustomers = async () => {
        const getcustomers = await LGetsCustomer_1.LGetCustomer.getLSortCustomers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(getcustomers);
        return arraydto;
    };
    getLCustomer = async (idcard) => {
        const getcustomer = await LGetsCustomer_1.LGetCustomer.getLCustomer(idcard);
        if (getcustomer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        return getcustomer.getDTO();
    };
    getLCustomerbyName = async (name, lastname) => {
        const getcustomer = await LGetsCustomer_1.LGetCustomer.getLCustomerbyName(name, lastname);
        if (getcustomer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        return getcustomer.getDTO();
    };
    getLCustomers = async () => {
        const getcustomers = await LGetsCustomer_1.LGetCustomer.getLCustomers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(getcustomers.arraycustomer);
        return arraydto;
    };
    //******************* AUTENTICATION *********************** */
    loginCustomer = async (idcard, password) => {
        const lcustomer = await LAutentication_1.LCustomerAutentication.getInstance().loginCustomer(idcard, password);
        return lcustomer.getDTO();
    };
    getloginCustomer = () => {
        const getloginc = LAutentication_1.LCustomerAutentication.getInstance().customerlogin;
        if (getloginc === null) {
            throw new logicexception_1.LogicException("There is no customer logged in");
        }
        return getloginc.getDTO();
    };
    logout = () => {
        const logout = LAutentication_1.LCustomerAutentication.getInstance().logout();
        return logout;
    };
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map