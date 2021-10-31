"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCategory = void 0;
const DTOCategory_1 = require("../../shared/entity/DTOCategory");
const Conection_1 = require("../Conection");
const mssql_1 = require("mssql");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DataCategory {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataCategory.instancia) {
            DataCategory.instancia = new DataCategory();
        }
        return DataCategory.instancia;
    }
    registerCategory = async (dtocat) => {
        try {
            let queryinsert = "insert into Category values (@NameC,@DescriptionC)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NameC', mssql_1.VarChar, dtocat.name)
                .input('DescriptionC', mssql_1.VarChar, dtocat.description)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateCategory = async (dtocat) => {
        try {
            let queryupdate = "Update Category Set DescriptionC=@DescriptionC where NameC=@NameC";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NameC', mssql_1.VarChar, dtocat.name)
                .input('DescriptionC', mssql_1.VarChar, dtocat.description)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getCategories = async () => {
        try {
            let queryget = "select * from Category";
            let poolcategory = await Conection_1.Conection.conection();
            let arraycat = [];
            const result = await poolcategory.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtocat = new DTOCategory_1.default(x.NameC, x.DescriptionC);
                arraycat.push(dtocat);
            }
            poolcategory.close();
            return arraycat;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.DataCategory = DataCategory;
//# sourceMappingURL=DataCategory.js.map