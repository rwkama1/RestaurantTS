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
            let queryinsert = "insert into Customer values (@IDCard,@Names,@LastName,@Town,@Addresss,@PhoneNumber,@Mail,@Salt,@Passwordd)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtc.idcard)
                .input('Names', mssql_1.VarChar, dtc.name)
                .input('LastName', mssql_1.VarChar, dtc.lastname)
                .input('Town', mssql_1.VarChar, dtc.town)
                .input('Addresss', mssql_1.VarChar, dtc.address)
                .input('PhoneNumber', mssql_1.VarChar, dtc.phonenumber)
                .input('Mail', mssql_1.VarChar, dtc.mail)
                .input('Salt', mssql_1.VarChar, dtc.salt)
                .input('Passwordd', mssql_1.VarChar, dtc.passwordd)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateCustomer = async (dtc) => {
        try {
            let queryupdate = "Update Customer Set NamesC=@Names,LastNameC=@LastName,TownC=@Town,AddressC=@Addresss,PhoneNumberC=@PhoneNumber,MailC=@Mail,SaltC=@Salt,PassworddC=@Passwordd where IDCardC=@IDCard";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtc.idcard)
                .input('Names', mssql_1.VarChar, dtc.name)
                .input('LastName', mssql_1.VarChar, dtc.lastname)
                .input('Town', mssql_1.VarChar, dtc.town)
                .input('Addresss', mssql_1.VarChar, dtc.address)
                .input('PhoneNumber', mssql_1.VarChar, dtc.phonenumber)
                .input('Mail', mssql_1.VarChar, dtc.mail)
                .input('Salt', mssql_1.VarChar, dtc.salt)
                .input('Passwordd', mssql_1.VarChar, dtc.passwordd)
                .query(queryupdate);
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
                let cust = new DTOCustomer_1.default(x.IDCardC, x.NamesC, x.LastNameC, x.TownC, x.AddressC, x.PhoneNumberC, x.MailC, x.SaltC, x.PassworddC);
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