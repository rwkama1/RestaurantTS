"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableCustomer = void 0;
const mssql_1 = require("mssql");
const Conection_1 = require("../Conection");
const DTOTableCustomer_1 = require("../../shared/entity/DTOTableCustomer");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DataTableCustomer {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataTableCustomer.instancia) {
            DataTableCustomer.instancia = new DataTableCustomer();
        }
        return DataTableCustomer.instancia;
    }
    registerTableCustomer = async (dtotc) => {
        try {
            let queryinsert = "insert into Table_Customer values (@IDT,@IDCustomer)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDT', mssql_1.Int, dtotc.idtable)
                .input('IDCustomer', mssql_1.Int, dtotc.customer.id)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    deleteTableCustomer = async (dtotc) => {
        try {
            let quarydelete = "DELETE FROM Table_Customer WHERE IDT=@IDT and IDCustomer=@IDCustomer";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDT', mssql_1.Int, dtotc.idtable)
                .input('IDCustomer', mssql_1.Int, dtotc.customer.id)
                .query(quarydelete);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getTableCustomer = async () => {
        try {
            let queryget = "select * from Table_Customer";
            let pool = await Conection_1.Conection.conection();
            let arraytc = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtotc = new DTOTableCustomer_1.default(x.IDTC, x.IDT, x.IDCustomer);
                arraytc.push(dtotc);
            }
            pool.close();
            return arraytc;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataTableCustomer = DataTableCustomer;
//# sourceMappingURL=DataTableCustomer.js.map