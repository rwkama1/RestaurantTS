"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOUser_1 = require("../../shared/entity/DTOUser");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataUser {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataUser.instancia) {
            DataUser.instancia = new DataUser();
        }
        return DataUser.instancia;
    }
    registerUser = async (dtuser) => {
        try {
            let queryinsert = "insert into Users values (@IDCardU,@NamesUserU,@CityU,@TypeUserU,@Hashh,@PasswordUserU)";
            let pool = await Conection_1.Conection.conection();
            //   let sqltools=Conection.sqlserver();
            const result = await pool.request()
                .input('IDCardU', mssql_1.VarChar, dtuser.idcard)
                .input('NamesUserU', mssql_1.VarChar, dtuser.name)
                .input('CityU', mssql_1.VarChar, dtuser.city)
                .input('TypeUserU', mssql_1.VarChar, dtuser.typeuserr)
                .input('PasswordUserU', mssql_1.VarChar, dtuser.password)
                .input('Hashh', mssql_1.VarChar, dtuser.hashh)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateUser = async (dtuser) => {
        try {
            let queryupdate = "Update Users Set NamesUserU=@NamesUserU,CityU=@CityU,TypeUserU=@TypeUserU,HashhU=@Hashh,PasswordUserU=@PasswordUserU where IDCardU=@IDCardU";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCardU', mssql_1.VarChar, dtuser.idcard)
                .input('NamesUserU', mssql_1.VarChar, dtuser.name)
                .input('CityU', mssql_1.VarChar, dtuser.city)
                .input('TypeUserU', mssql_1.VarChar, dtuser.typeuserr)
                .input('PasswordUserU', mssql_1.VarChar, dtuser.password)
                .input('Hashh', mssql_1.VarChar, dtuser.hashh)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    deleteUser = async (dtuser) => {
        try {
            let qdelete = "DELETE FROM Users where IDCardU=@IDCardU";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCardU', mssql_1.VarChar, dtuser.idcard)
                .query(qdelete);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getUsers = async () => {
        try {
            let queryget = "select * from Users";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCardU, x.NamesUserU, x.CityU, x.TypeUserU, x.HashhU, x.PasswordUserU);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataUser;
//# sourceMappingURL=DataUser.js.map