"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
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
    //************ REGISTER ********************** */
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
    getLCustomer = async (id) => {
        const getcustomer = await LGetsCustomer_1.LGetCustomer.getLCustomer(id);
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
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map