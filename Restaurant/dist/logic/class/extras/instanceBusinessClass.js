"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceLogicClass = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LCategory_1 = require("../business_class/LCategory");
const LCustomer_1 = require("../business_class/LCustomer");
const LDish_1 = require("../business_class/LDish");
const LDishC_1 = require("../business_class/LDishC");
const LTable_1 = require("../business_class/LTable");
const LTableCustomer_1 = require("../business_class/LTableCustomer");
const LUser_1 = require("../business_class/LUser");
const LGetCategory_1 = require("../category_maintenance/maintenance/LGetCategory");
const LGetsCustomer_1 = require("../customer_maintenance/maintenance/LGetsCustomer");
const LGetTable_1 = require("../table_maintenance/maintenance/LGetTable");
class InstanceLogicClass {
    static instanceLUser = (dtouser) => {
        var logicuser = new LUser_1.default(dtouser.idcard, dtouser.name, dtouser.city, dtouser.typeuserr, dtouser.hashh, dtouser.password);
        return logicuser;
    };
    static instanceLCustomer = (dtc) => {
        var logicustomer = new LCustomer_1.default(dtc.id, dtc.name, dtc.lastname);
        return logicustomer;
    };
    static instanceLCategory = (dtocat) => {
        let logiccat = new LCategory_1.default(dtocat.name, dtocat.description);
        return logiccat;
    };
    static instanceLDish = async (dtodish) => {
        let arrayldishc = [];
        for (let dtodishc of dtodish.arraycharact) {
            arrayldishc.push(new LDishC_1.default(dtodishc.iddishc, dtodishc.namei, dtodishc.costi, dtodishc.quantity));
        }
        let searchcategory = await LGetCategory_1.LGetCategory.getLCategory(dtodish.category);
        if (searchcategory === null) {
            throw new logicexception_1.LogicException("The Category does not exists");
        }
        let logicdish = new LDish_1.default(dtodish.iddish, dtodish.name, searchcategory, dtodish.description, dtodish.img, dtodish.price, arrayldishc, dtodish.cost, dtodish.quantity);
        return logicdish;
    };
    static instanceLTable = (dtot) => {
        let logic = new LTable_1.default(dtot.IDT, dtot.StateT);
        return logic;
    };
    static instanceLTableCustomer = async (dtotc) => {
        let table = await LGetTable_1.LGetTable.getLTable(dtotc.idtable);
        if (table === null) {
            throw new logicexception_1.LogicException("The Table does not exists in the system");
        }
        let customer = await LGetsCustomer_1.LGetCustomer.getLCustomer(dtotc.idtable);
        if (customer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        let logic = new LTableCustomer_1.default(dtotc.idtc, table, customer);
        return logic;
    };
}
exports.InstanceLogicClass = InstanceLogicClass;
//# sourceMappingURL=instanceBusinessClass.js.map