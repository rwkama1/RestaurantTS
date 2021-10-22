"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOTable_1 = require("../../../shared/entity/DTOTable");
class LogicTable {
    _idtable;
    _statetable;
    //GETTERS
    get idtable() {
        return this._idtable;
    }
    get statetable() {
        return this._statetable;
    }
    //SETTERS
    set idtable(value) {
        this._idtable = value;
    }
    set statetable(value) {
        this._statetable = value;
    }
    getDTO = () => {
        let dtot = new DTOTable_1.default(this.idtable, this.statetable);
        return dtot;
    };
    constructor(pidtable, pstatet) {
        this.idtable = pidtable;
        this.statetable = pstatet;
    }
}
exports.default = LogicTable;
//# sourceMappingURL=LTable.js.map