"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataOrder = void 0;
const Conection_1 = require("../Conection");
const mssql_1 = require("mssql");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const DTODetailOrder_1 = require("../../shared/entity/DTODetailOrder");
const DTOOrder_1 = require("../../shared/entity/DTOOrder");
class DataOrder {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataOrder.instancia) {
            DataOrder.instancia = new DataOrder();
        }
        return DataOrder.instancia;
    }
    getOrders = async () => {
        try {
            let queryget = "select * from Orderr";
            let pool = await Conection_1.Conection.conection();
            let arrayo = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let order = new DTOOrder_1.default(x.IDO, x.DateO, x.StateO, x.SpecialRequirement, x.NumberPeople, x.IDCustomer, await this.getDeailOrders(x.IDO));
                arrayo.push(order);
            }
            pool.close();
            return arrayo;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getDeailOrders = async (idorder) => {
        try {
            let queryget = "select * from DetailOrder where IDO=@IDO";
            let pool = await Conection_1.Conection.conection();
            let arraydo = [];
            const result = await pool.request()
                .input('IDO', mssql_1.Int, idorder)
                .query(queryget);
            for (let x of result.recordset) {
                let detailo = new DTODetailOrder_1.default(x.IDDO, x.QuantityDO, x.AmountDO, x.IDDish);
                arraydo.push(detailo);
            }
            pool.close();
            return arraydo;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataOrder = DataOrder;
//# sourceMappingURL=DateOrder.js.map