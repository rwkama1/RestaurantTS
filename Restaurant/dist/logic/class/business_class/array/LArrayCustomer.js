"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCustomer = void 0;
class ArrayCustomer {
    arraycustomer;
    constructor(parraycustomer) {
        this.arraycustomer = parraycustomer;
    }
    search = (id) => {
        let listc = this.arraycustomer;
        for (let c of listc) {
            if (id === c.id) {
                return c;
            }
        }
        return null;
    };
    searchbyname = (name, lastname) => {
        let listc = this.arraycustomer;
        for (let customer of listc) {
            if (customer.name === name || customer.lastname === lastname) {
                return customer;
            }
        }
        return null;
    };
    getSort = () => {
        let listc = this.arraycustomer;
        const sortarray = listc.sort((a, b) => a.name.localeCompare(b.name));
        return sortarray;
    };
}
exports.ArrayCustomer = ArrayCustomer;
//# sourceMappingURL=LArrayCustomer.js.map