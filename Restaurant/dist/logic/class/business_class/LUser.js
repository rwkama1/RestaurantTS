"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOUser_1 = require("../../../shared/entity/DTOUser");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../encrypt/hashPassword");
class LogicUser {
    _idcard;
    _name;
    _hashh;
    _city;
    _password;
    _typeuserr;
    //GETTERS
    get idcard() {
        return this._idcard;
    }
    get name() {
        return this._name;
    }
    get hashh() {
        return this._hashh;
    }
    get city() {
        return this._city;
    }
    get password() {
        return this._password;
    }
    get typeuserr() {
        return this._typeuserr;
    }
    //SETTERS
    set idcard(value) {
        var numbers = /^[0-9]+$/;
        if (!value.trim().match(numbers)) {
            throw new logicexception_1.LogicException("The identity card must have only numbers");
        }
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The identity card cannot be empty");
        }
        this._idcard = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set hashh(value) {
        this._hashh = value;
    }
    set password(value) {
        this._password = value;
    }
    set city(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The city cannot be empty");
        }
        this._city = value;
    }
    set typeuserr(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The typeuser cannot be empty");
        }
        if (value.trim() != "Administrator" && value.trim() != "Waiter" && value.trim() != "Chef" && value.trim() != "Cashier") {
            throw new logicexception_1.LogicException("The user can only be of the type Administrator,Waiter,Chef and Cashier");
        }
        this._typeuserr = value;
    }
    //******************************************************* */
    validatePassword = () => {
        let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
        if (!this.password.match(pass)) {
            throw new logicexception_1.LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
        }
    };
    //******************************************************* */
    register = async () => {
        this.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.hashh = passh.salt;
        return this.getDTO();
    };
    update = async () => {
        this.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.hashh = passh.salt;
        return this.getDTO();
    };
    getDTO = () => {
        let dtouser = new DTOUser_1.default(this.idcard, this.name, this.city, this.typeuserr, this.hashh, this.password);
        return dtouser;
    };
    constructor(pidcard, pname, pcity, ptypeuser, phash, ppasswordd) {
        this.idcard = pidcard;
        this.name = pname;
        this.city = pcity;
        this.typeuserr = ptypeuser;
        this.hashh = phash;
        this.password = ppasswordd;
    }
}
exports.default = LogicUser;
//# sourceMappingURL=LUser.js.map