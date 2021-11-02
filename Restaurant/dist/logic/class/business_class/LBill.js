"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOBill_1 = require("../../../shared/entity/DTOBill");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
class LogicBill {
    _idbill;
    _subtotal;
    _totalb;
    _vat;
    _state;
    _lorder;
    _date;
    //GETTERS
    get idbill() {
        return this._idbill;
    }
    get subtotal() {
        return this._subtotal;
    }
    get totalb() {
        return this._totalb;
    }
    get vat() {
        return this._vat;
    }
    get state() {
        return this._state;
    }
    get lorder() {
        return this._lorder;
    }
    get date() {
        return this._date;
    }
    //SETTERS
    set idbill(value) {
        this._idbill = value;
    }
    set subtotal(value) {
        let totalorder = this.lorder.calculateTotal();
        this._subtotal = totalorder;
    }
    set totalb(value) {
        this._totalb = this.subtotal + this.calculateSubtotalVAT();
    }
    set vat(value) {
        this._vat = value;
    }
    set state(value) {
        if (value.trim() != "Pending" && value.trim() != "Cashed" && value.trim() != "Canceled") {
            throw new logicexception_1.LogicException("The state can only be Pending,Canceled and Cashed");
        }
        this._state = value;
    }
    set lorder(value) {
        this._lorder = value;
    }
    set date(value) {
        this._date = value;
    }
    getDTO = () => {
        let dtobill = new DTOBill_1.default(this.idbill, this.subtotal, this.totalb, this.vat, this.state, this.lorder.idorder, this.date);
        return dtobill;
    };
    calculateSubtotalVAT = () => {
        let calcvat = this.vat / 100;
        let vatsubtotal = this.subtotal * calcvat;
        return vatsubtotal;
    };
    constructor(pidbill, psubtotal, ptotalb, pvat, pstate, plorder, pdate) {
        this.lorder = plorder;
        this.idbill = pidbill;
        this.vat = pvat;
        this.subtotal = psubtotal;
        this.totalb = ptotalb;
        this.state = pstate;
        this.date = pdate;
    }
}
exports.default = LogicBill;
//# sourceMappingURL=LBill.js.map