"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTable = void 0;
class ArrayTable {
    arrayt;
    constructor(parrayt) {
        this.arrayt = parrayt;
    }
    search = (id) => {
        for (let t of this.arrayt) {
            if (id === t.idtable) {
                return t;
            }
        }
        return null;
    };
    getAvailable = () => {
        let newarray = [];
        for (let t of this.arrayt) {
            if (t.statetable === "Available") {
                newarray.push(t);
            }
        }
        return newarray;
    };
    getBusy = () => {
        let newarray = [];
        for (let t of this.arrayt) {
            if (t.statetable === "Busy") {
                newarray.push(t);
            }
        }
        return newarray;
    };
}
exports.ArrayTable = ArrayTable;
//# sourceMappingURL=LArrayTable.js.map