"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTableCustomer = void 0;
class ArrayTableCustomer {
    arraytc;
    constructor(parratc) {
        this.arraytc = parratc;
    }
    search = (idtc) => {
        for (let tablec of this.arraytc) {
            if (idtc === tablec.idtc) {
                return tablec;
            }
        }
        return null;
    };
    searchbyTable = (idt) => {
        for (let tablec of this.arraytc) {
            if (idt === tablec.table.idtable) {
                return tablec;
            }
        }
        return null;
    };
    searchbyCustomer = (name, lastname) => {
        for (let tablec of this.arraytc) {
            if (name === tablec.customer.name || lastname === tablec.customer.lastname) {
                return tablec;
            }
        }
        return null;
    };
    //*************************** */
    getSortbyCustomer = () => {
        const sortarray = this.arraytc.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
        return sortarray;
    };
    getSortbyTable = () => {
        const sortarray = this.arraytc.sort((a, b) => a.table.idtable - b.table.idtable);
        return sortarray;
    };
}
exports.ArrayTableCustomer = ArrayTableCustomer;
//# sourceMappingURL=LArrayTableCustomer.js.map