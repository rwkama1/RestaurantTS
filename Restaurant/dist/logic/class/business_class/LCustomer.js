"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOCustomer_1 = require("../../../shared/entity/DTOCustomer");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../encrypt/hashPassword");
class LogicCustomer {
    _idcard;
    _name;
    _town;
    _lastname;
    _address;
    _mail;
    _phonenumber;
    _salt;
    _passwordd;
    //GETTERS 
    get idcard() {
        return this._idcard;
    }
    get name() {
        return this._name;
    }
    get town() {
        return this._town;
    }
    get lastname() {
        return this._lastname;
    }
    get address() {
        return this._address;
    }
    get mail() {
        return this._mail;
    }
    get phonenumber() {
        return this._phonenumber;
    }
    get salt() {
        return this._salt;
    }
    get passwordd() {
        return this._passwordd;
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
    set town(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The town cannot be empty");
        }
        this._town = value;
    }
    set lastname(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The lastname cannot be empty");
        }
        this._lastname = value;
    }
    set address(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The address cannot be empty");
        }
        this._address = value;
    }
    set mail(value) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat)) {
            throw new logicexception_1.LogicException("The email is not valid");
        }
        this._mail = value;
    }
    set phonenumber(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The address cannot be empty");
        }
        this._phonenumber = value;
    }
    set salt(value) {
        this._salt = value;
    }
    set passwordd(value) {
        this._passwordd = value;
    }
    validatePassword = () => {
        let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
        if (!this.passwordd.match(pass)) {
            throw new logicexception_1.LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
        }
    };
    register = async () => {
        this.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(this.passwordd);
        this.passwordd = passh.hash;
        this.salt = passh.salt;
        return this.getDTO();
    };
    update = async (dtc) => {
        this.passwordd = dtc.passwordd;
        this.validatePassword();
        this.name = dtc.name;
        this.town = dtc.town;
        this.lastname = dtc.lastname;
        this.address = dtc.address;
        this.mail = dtc.mail;
        this.phonenumber = dtc.phonenumber;
        const passh = await hashPassword_1.default.hashPassword(dtc.passwordd);
        this.passwordd = passh.hash;
        this.salt = passh.salt;
        return this.getDTO();
    };
    getDTO = () => {
        let dtocustomer = new DTOCustomer_1.default(this.idcard, this.name, this.lastname, this.town, this.address, this.phonenumber, this.mail, this.salt, this.passwordd);
        return dtocustomer;
    };
    constructor(pidcard, pname, plastname, ptown, paddress, pphonenumber, pmail, psalt, ppasswordd) {
        this.idcard = pidcard;
        this.name = pname;
        this.lastname = plastname;
        this.town = ptown;
        this.address = paddress;
        this.phonenumber = pphonenumber;
        this.mail = pmail;
        this.salt = psalt;
        this.passwordd = ppasswordd;
    }
}
exports.default = LogicCustomer;
//# sourceMappingURL=LCustomer.js.map