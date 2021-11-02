"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOBill {
    idbill;
    subtotal;
    totalb;
    vat;
    state;
    idorder;
    date;
    constructor(pidbill, psubtotal, ptotalb, pvat, pstate, pidorder, pdate) {
        this.idbill = pidbill;
        this.date = pdate;
        this.subtotal = psubtotal;
        this.totalb = ptotalb;
        this.vat = pvat;
        this.state = pstate;
        this.idorder = pidorder;
    }
}
exports.default = DTOBill;
//# sourceMappingURL=DTOBill.js.map