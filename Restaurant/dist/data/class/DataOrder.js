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
    registerOrder = async (dtoorder) => {
        try {
            let queryinsert = "insert into Orderr values (@IDO,@DateO,@StateO,@SpecialRequirement,@NumberPeople,@IDCustomer)";
            let queryinsert2 = "insert into DetailOrder values (@IDDO,@QuantityDO,@AmountDO,@IDO,@IDDish)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDO', mssql_1.Int, dtoorder.idorder)
                .input('DateO', mssql_1.DateTime, dtoorder.dateorder)
                .input('StateO', mssql_1.VarChar, dtoorder.stateorder)
                .input('SpecialRequirement', mssql_1.VarChar, dtoorder.specialrequirements)
                .input('NumberPeople', mssql_1.Int, dtoorder.numberpeople)
                .input('IDCustomer', mssql_1.Int, dtoorder.idcustomer)
                .query(queryinsert);
            for (let detailo of dtoorder.detailorders) {
                const result2 = await pool.request()
                    .input('IDDO', mssql_1.Int, detailo.iddetailorder)
                    .input('QuantityDO', mssql_1.Int, detailo.quantitydo)
                    .input('AmountDO', mssql_1.Money, detailo.amountdo)
                    .input('IDO', mssql_1.Int, dtoorder.idorder)
                    .input('IDDish', mssql_1.Int, detailo.iddish)
                    .query(queryinsert2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateOrder = async (dtoorder) => {
        try {
            let queryupdate = "Update Orderr Set DateO=@DateO,StateO=@StateO,SpecialRequirement=@SpecialRequirement,NumberPeople=@NumberPeople,IDCustomer=@IDCustomer where IDO=@IDO";
            let queryupdate2 = "Update DetailOrder Set QuantityDO=@QuantityDO,AmountDO=@AmountDO,IDDish=@IDDish where IDO=@IDO and IDDO=@IDDO";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDO', mssql_1.Int, dtoorder.idorder)
                .input('DateO', mssql_1.DateTime, dtoorder.dateorder)
                .input('StateO', mssql_1.VarChar, dtoorder.stateorder)
                .input('SpecialRequirement', mssql_1.VarChar, dtoorder.specialrequirements)
                .input('NumberPeople', mssql_1.Int, dtoorder.numberpeople)
                .input('IDCustomer', mssql_1.Int, dtoorder.idcustomer)
                .query(queryupdate);
            for (let detailo of dtoorder.detailorders) {
                const result2 = await pool.request()
                    .input('IDDO', mssql_1.Int, detailo.iddetailorder)
                    .input('QuantityDO', mssql_1.Int, detailo.quantitydo)
                    .input('AmountDO', mssql_1.Money, detailo.amountdo)
                    .input('IDO', mssql_1.Int, dtoorder.idorder)
                    .input('IDDish', mssql_1.Int, detailo.iddish)
                    .query(queryupdate2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
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
    //********************* DETAIL ORDER ************** */
    registerDetailOrder = async (dtoorder) => {
        try {
            let lengthdo = dtoorder.detailorders.length;
            let queryinsert = "insert into DetailOrder values (@IDDO,@QuantityDO,@AmountDO,@IDO,@IDDish)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDDO', mssql_1.Int, dtoorder.detailorders[lengthdo - 1].iddetailorder)
                .input('QuantityDO', mssql_1.Int, dtoorder.detailorders[lengthdo - 1].quantitydo)
                .input('AmountDO', mssql_1.Money, dtoorder.detailorders[lengthdo - 1].amountdo)
                .input('IDO', mssql_1.Int, dtoorder.idorder)
                .input('IDDish', mssql_1.Int, dtoorder.detailorders[lengthdo - 1].iddish)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    deleteDetailOrder = async (dtoorder) => {
        try {
            let quarydelete = "DELETE FROM DetailOrder WHERE IDO=@IDO";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDO', mssql_1.Int, dtoorder.idorder)
                .query(quarydelete);
            pool.close();
            return true;
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
//# sourceMappingURL=DataOrder.js.map