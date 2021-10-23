"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOTableCustomer_1 = require("../../../shared/entity/DTOTableCustomer");
class LogicTableCustomer {
    _idtc;
    _table;
    _customer;
    //GETTERS
    get idtc() {
        return this._idtc;
    }
    get table() {
        return this._table;
    }
    get customer() {
        return this._customer;
    }
    //SETTERS
    set idtc(value) {
        this._idtc = value;
    }
    set table(value) {
        this._table = value;
    }
    set customer(value) {
        this._customer = value;
    }
    getDTO = () => {
        let dtotc = new DTOTableCustomer_1.default(this.idtc, this.table.idtable, this.customer.getDTO());
        return dtotc;
    };
    constructor(pidtc, ptable, pcustomer) {
        this.idtc = pidtc;
        this.table = ptable;
        this.customer = pcustomer;
    }
}
exports.default = LogicTableCustomer;
//# sourceMappingURL=LTableCustomer.js.map