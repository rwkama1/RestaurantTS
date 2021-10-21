"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODishC_1 = require("../../../shared/entity/DTODishC");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
class LogicDishC {
    _iddishc;
    _name;
    _cost;
    _quantity;
    //GETTERS
    get iddishc() {
        return this._iddishc;
    }
    get name() {
        return this._name;
    }
    get quantity() {
        return this._quantity;
    }
    get cost() {
        return this._cost;
    }
    //SETTERS
    set iddishc(value) {
        this._iddishc = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set cost(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The cost must be greater than 0");
        }
        this._cost = value;
    }
    set quantity(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The quantity must be greater than 0");
        }
        this._quantity = value;
    }
    update = (dtodishi) => {
        this.name = dtodishi.namei;
        this.cost = dtodishi.costi;
        this.quantity = dtodishi.quantity;
    };
    calculateAmount = () => {
        let amount = this.cost * this.quantity;
        return amount;
    };
    getDTO = () => {
        let dtodishc = new DTODishC_1.default(this.iddishc, this.name, this.cost, this.quantity);
        return dtodishc;
    };
    constructor(piddishc, pname, pcost, pquantity) {
        this.iddishc = piddishc;
        this.name = pname;
        this.cost = pcost;
        this.quantity = pquantity;
    }
}
exports.default = LogicDishC;
//# sourceMappingURL=LDishC.js.map