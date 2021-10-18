"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCustomerAutentication = void 0;
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../../encrypt/hashPassword");
const LGetsCustomer_1 = require("./LGetsCustomer");
class LCustomerAutentication {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCustomerAutentication.instancia) {
            LCustomerAutentication.instancia = new LCustomerAutentication();
        }
        return LCustomerAutentication.instancia;
    }
    _customerlogin;
    get customerlogin() {
        return this._customerlogin;
    }
    set customerlogin(value) {
        this._customerlogin = value;
    }
    loginCustomer = async (idcard, password) => {
        let customersearch = await LGetsCustomer_1.LGetCustomer.getLCustomer(idcard);
        if (customersearch === null) {
            throw new logicexception_1.LogicException("That Customer does not exists in the system");
        }
        const verifyp = await hashPassword_1.default.verifyPassword(password, customersearch.passwordd, customersearch.salt);
        if (verifyp === false) {
            throw new logicexception_1.LogicException("Wrong password");
        }
        this.customerlogin = customersearch;
        return this.customerlogin;
    };
    logout() {
        let lcustomer = this.customerlogin;
        if (lcustomer != null) {
            this.customerlogin = null;
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LCustomerAutentication = LCustomerAutentication;
//# sourceMappingURL=LAutentication.js.map