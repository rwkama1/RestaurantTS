"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const dataexception_1 = require("../../shared/exceptions/dataexception");
const mssql_1 = require("mssql");
const Conection_1 = require("../Conection");
const DTOTable_1 = require("../../shared/entity/DTOTable");
class DataTable {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataTable.instancia) {
            DataTable.instancia = new DataTable();
        }
        return DataTable.instancia;
    }
    registerTable = async () => {
        try {
            let queryinsert = "insert into TablesR values ('Available')";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    changeState = async (dtot) => {
        try {
            let queryupdate = "Update TablesR Set StateT=@StateT where IDT=@IDT";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDT', mssql_1.Int, dtot.IDT)
                .input('StateT', mssql_1.VarChar, dtot.StateT)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getTables = async () => {
        try {
            let queryget = "select * from TablesR";
            let pool = await Conection_1.Conection.conection();
            let arraytables = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtot = new DTOTable_1.default(x.IDT, x.StateT);
                arraytables.push(dtot);
            }
            pool.close();
            return arraytables;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataTable = DataTable;
//# sourceMappingURL=DataTable.js.map