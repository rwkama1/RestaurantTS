"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayBill = void 0;
class ArrayBill {
    arraybill;
    constructor(parraybill) {
        this.arraybill = parraybill;
    }
    search = (id) => {
        let listb = this.arraybill;
        for (let bill of listb) {
            if (id === bill.idbill) {
                return bill;
            }
        }
        return null;
    };
    searchbyOrder = (id) => {
        let listb = this.arraybill;
        for (let bill of listb) {
            if (id === bill.lorder.idorder) {
                return bill;
            }
        }
        return null;
    };
    searchbyCustomer = (name) => {
        let listb = this.arraybill;
        let newarray = [];
        for (let bill of listb) {
            if (bill.lorder.customer.name.match(name)) {
                newarray.push(bill);
            }
        }
        return newarray;
    };
    searchbyDates = (date1, date2) => {
        let listb = this.arraybill;
        let newarray = [];
        for (let bill of listb) {
            if (date1 <= bill.date && bill.date <= date2) {
                newarray.push(bill);
            }
        }
        return newarray;
    };
}
exports.ArrayBill = ArrayBill;
//# sourceMappingURL=LArrayBill.js.map