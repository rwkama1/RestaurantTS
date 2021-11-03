"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBill = void 0;
const DTOBill_1 = require("../../shared/entity/DTOBill");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
const mssql_1 = require("mssql");
class DataBill {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataBill.instancia) {
            DataBill.instancia = new DataBill();
        }
        return DataBill.instancia;
    }
    registerBill = async (dtobill) => {
        try {
            let queryinsert = "insert into Bill values (@DateB,@SubtotalB,@TotalB,@VATB,@StateB,@IDOB)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('DateB', mssql_1.Date, dtobill.date)
                .input('SubtotalB', mssql_1.Money, dtobill.subtotal)
                .input('TotalB', mssql_1.Money, dtobill.totalb)
                .input('VATB', mssql_1.Money, dtobill.vat)
                .input('StateB', mssql_1.VarChar, dtobill.state)
                .input('IDOB', mssql_1.Int, dtobill.idorder)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateState = async (dtobill) => {
        try {
            let queryupdate = "Update Bill Set StateB=@StateB where IDB=@IDB";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDB', mssql_1.Int, dtobill.idbill)
                .input('StateB', mssql_1.VarChar, dtobill.state)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getBills = async () => {
        try {
            let queryget = "select * from Bill";
            let pool = await Conection_1.Conection.conection();
            let arrayo = [];
            const result = await pool.request()
                .query(queryget);
            for (let p of result.recordset) {
                let bill = new DTOBill_1.default(p.IDB, p.SubtotalB, p.TotalB, p.VATB, p.StateB, p.IDOB, p.DateB);
                arrayo.push(bill);
            }
            pool.close();
            return arrayo;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataBill = DataBill;
//# sourceMappingURL=DataBill.js.map