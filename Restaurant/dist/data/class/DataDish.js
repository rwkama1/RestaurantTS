"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDish = void 0;
const DTODish_1 = require("../../shared/entity/DTODish");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const mssql_1 = require("mssql");
const Conection_1 = require("../Conection");
const DTODishC_1 = require("../../shared/entity/DTODishC");
class DataDish {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataDish.instancia) {
            DataDish.instancia = new DataDish();
        }
        return DataDish.instancia;
    }
    registerDish = async (dtodish) => {
        try {
            let queryinsert = "insert into Dish values (@IDD,@NameD,@NameC,@DescriptionD,@ImgD,@PriceD,@CostD,@QuantityAD)";
            let queryinsert2 = "insert into Ingredient values (@IDDC,@IDDish,@NameI,@CostI,@QuantityI)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDD', mssql_1.Int, dtodish.iddish)
                .input('NameD', mssql_1.VarChar, dtodish.name)
                .input('NameC', mssql_1.VarChar, dtodish.category)
                .input('DescriptionD', mssql_1.VarChar, dtodish.description)
                .input('ImgD', mssql_1.VarChar, dtodish.img)
                .input('PriceD', mssql_1.Money, dtodish.price)
                .input('CostD', mssql_1.Money, dtodish.cost)
                .input('QuantityAD', mssql_1.Int, dtodish.quantity)
                .query(queryinsert);
            for (let dishc of dtodish.arraycharact) {
                const result2 = await pool.request()
                    .input('IDDC', mssql_1.Int, dishc.iddishc)
                    .input('IDDish', mssql_1.Int, dtodish.iddish)
                    .input('NameI', mssql_1.VarChar, dishc.namei)
                    .input('CostI', mssql_1.Money, dishc.costi)
                    .input('QuantityI', mssql_1.Int, dishc.quantity)
                    .query(queryinsert2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateDish = async (dtodish) => {
        try {
            let queryupdate = "Update Dish Set NameD=@NameD,NameC=@NameC,DescriptionD=@DescriptionD,ImgD=@ImgD,PriceD=@PriceD where IDD=@IDD";
            let queryupdate2 = "Update Ingredient Set NameI=@NameI,CostI=@CostI,QuantityI=@QuantityI where IDDC=@IDDC and IDDish=@IDDish";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDD', mssql_1.Int, dtodish.iddish)
                .input('NameD', mssql_1.VarChar, dtodish.name)
                .input('NameC', mssql_1.VarChar, dtodish.category)
                .input('DescriptionD', mssql_1.VarChar, dtodish.description)
                .input('ImgD', mssql_1.VarChar, dtodish.img)
                .input('PriceD', mssql_1.Money, dtodish.price)
                .query(queryupdate);
            for (let dishc of dtodish.arraycharact) {
                const result2 = await pool.request()
                    .input('IDDC', mssql_1.Int, dishc.iddishc)
                    .input('IDDish', mssql_1.Int, dtodish.iddish)
                    .input('NameI', mssql_1.VarChar, dishc.namei)
                    .input('CostI', mssql_1.Money, dishc.costi)
                    .input('QuantityI', mssql_1.Int, dishc.quantity)
                    .query(queryupdate2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getDishes = async () => {
        try {
            let queryget = "select * from Dish";
            let pool3 = await Conection_1.Conection.conection();
            let arraydish = [];
            const result = await pool3.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtodish = new DTODish_1.default(x.IDD, x.NameD, x.NameC, x.DescriptionD, x.ImgD, x.PriceD, await this.getDishIngredients(x.IDD), x.CostD, x.QuantityAD);
                arraydish.push(dtodish);
            }
            pool3.close();
            return arraydish;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getDishesWithoutI = async () => {
        try {
            let queryget = "select * from Dish";
            let pooldi = await Conection_1.Conection.conection();
            let arraydish = [];
            const result = await pooldi.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtodish = new DTODish_1.default(x.IDD, x.NameD, x.NameC, x.DescriptionD, x.ImgD, x.PriceD, [], x.CostD, x.QuantityAD);
                arraydish.push(dtodish);
            }
            pooldi.close();
            return arraydish;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateCost = async (dtodish) => {
        try {
            let queryupdate = "Update Dish Set CostD=@CostD where IDD=@IDD";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDD', mssql_1.Int, dtodish.iddish)
                .input('CostD', mssql_1.Money, dtodish.cost)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateQuantity = async (dtodish) => {
        try {
            let queryupdate = "Update Dish Set QuantityAD=@QuantityAD where IDD=@IDD";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDD', mssql_1.Int, dtodish.iddish)
                .input('QuantityAD', mssql_1.Int, dtodish.quantity)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    //****************************************************** */
    getDishIngredients = async (numberdish) => {
        try {
            let queryget = "select * from Ingredient where IDDish=@IDDish";
            let pool2 = await Conection_1.Conection.conection();
            let arraydish = [];
            const result = await pool2.request()
                .input('IDDish', mssql_1.Int, numberdish)
                .query(queryget);
            for (let x of result.recordset) {
                let dtodishc = new DTODishC_1.default(x.IDDC, x.NameI, x.CostI, x.QuantityI);
                arraydish.push(dtodishc);
            }
            pool2.close();
            return arraydish;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    addDishIngredient = async (dtodish) => {
        let listdishc = dtodish.arraycharact.length;
        let queryinsert2 = "insert into Ingredient values (@IDDC,@IDDish,@NameI,@CostI,@QuantityI)";
        try {
            let pool = await Conection_1.Conection.conection();
            const result2 = await pool.request()
                .input('IDDC', mssql_1.Int, dtodish.arraycharact[listdishc - 1].iddishc)
                .input('IDDish', mssql_1.Int, dtodish.iddish)
                .input('NameI', mssql_1.VarChar, dtodish.arraycharact[listdishc - 1].namei)
                .input('CostI', mssql_1.Money, dtodish.arraycharact[listdishc - 1].costi)
                .input('QuantityI', mssql_1.Int, dtodish.arraycharact[listdishc - 1].quantity)
                .query(queryinsert2);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataDish = DataDish;
//# sourceMappingURL=DataDish.js.map