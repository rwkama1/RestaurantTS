"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOCustomer_1 = require("../../shared/entity/DTOCustomer");
const Conection_1 = require("../Conection");
const mssql_1 = require("mssql");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DataCustomer {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataCustomer.instancia) {
            DataCustomer.instancia = new DataCustomer();
        }
        return DataCustomer.instancia;
    }
    registerCustomer = async (dtc) => {
        try {
            let queryinsert = "insert into Customer values (@Names,@LastName)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('Names', mssql_1.VarChar, dtc.name)
                .input('LastName', mssql_1.VarChar, dtc.lastname)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getCustomers = async () => {
        try {
            let queryget = "select * from Customer";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let cust = new DTOCustomer_1.default(x.IDCustomer, x.NamesC, x.LastNameC);
                arrayu.push(cust);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataCustomer;
//# sourceMappingURL=DataCustomer.js.map