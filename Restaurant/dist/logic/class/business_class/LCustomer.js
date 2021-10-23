"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOCustomer_1 = require("../../../shared/entity/DTOCustomer");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
class LogicCustomer {
    _id;
    _name;
    _lastname;
    //GETTERS 
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get lastname() {
        return this._lastname;
    }
    //SETTERS
    set id(value) {
        this._id = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set lastname(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The lastname cannot be empty");
        }
        this._lastname = value;
    }
    getDTO = () => {
        let dtocustomer = new DTOCustomer_1.default(this.id, this.name, this.lastname);
        return dtocustomer;
    };
    constructor(pid, pname, plastname) {
        this.id = pid;
        this.name = pname;
        this.lastname = plastname;
    }
}
exports.default = LogicCustomer;
//# sourceMappingURL=LCustomer.js.map