"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceLogicClass = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LBill_1 = require("../business_class/LBill");
const LCategory_1 = require("../business_class/LCategory");
const LCustomer_1 = require("../business_class/LCustomer");
const LDetailOrder_1 = require("../business_class/LDetailOrder");
const LDish_1 = require("../business_class/LDish");
const LDishC_1 = require("../business_class/LDishC");
const LOrder_1 = require("../business_class/LOrder");
const LTable_1 = require("../business_class/LTable");
const LTableCustomer_1 = require("../business_class/LTableCustomer");
const LUser_1 = require("../business_class/LUser");
const LGetCategory_1 = require("../category_maintenance/maintenance/LGetCategory");
const LGetsCustomer_1 = require("../customer_maintenance/maintenance/LGetsCustomer");
const LGetDish_1 = require("../dish_maintenance/maintenance/LGetDish");
const LGetOrders_1 = require("../order_maintenance/maintenance/LGetOrders");
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
        let searchcategory;
        let dtodishc;
        let logicdish;
        for (dtodishc of dtodish.arraycharact) {
            arrayldishc.push(new LDishC_1.default(dtodishc.iddishc, dtodishc.namei, dtodishc.costi, dtodishc.quantity));
        }
        searchcategory = await LGetCategory_1.LGetCategory.getLCategory(dtodish.category);
        if (searchcategory === null) {
            throw new logicexception_1.LogicException("The Category does not exists");
        }
        logicdish = new LDish_1.default(dtodish.iddish, dtodish.name, searchcategory, dtodish.description, dtodish.img, dtodish.price, arrayldishc, dtodish.cost, dtodish.quantity);
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
        let customer = await LGetsCustomer_1.LGetCustomer.getLCustomer(dtotc.idcustomer);
        if (customer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        let logic = new LTableCustomer_1.default(dtotc.idtc, table, customer);
        return logic;
    };
    static instanceLOrder = async (dtoorder) => {
        let arraydetailo = [];
        let ldish;
        let ldetailo;
        let lcustomer;
        let logicorder;
        let dtodo;
        for (dtodo of dtoorder.detailorders) {
            ldish = await LGetDish_1.LGetDish.getLDishWithoutI(dtodo.iddish);
            if (ldish === null) {
                throw new logicexception_1.LogicException("The Dish does not exists in the system");
            }
            ldetailo = new LDetailOrder_1.default(dtodo.iddetailorder, dtodo.quantitydo, dtodo.amountdo, ldish);
            arraydetailo.push(ldetailo);
        }
        lcustomer = await LGetsCustomer_1.LGetCustomer.getLCustomer(dtoorder.idcustomer);
        if (lcustomer === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        logicorder = new LOrder_1.default(dtoorder.idorder, dtoorder.dateorder, dtoorder.stateorder, dtoorder.specialrequirements, dtoorder.numberpeople, lcustomer, arraydetailo);
        return logicorder;
    };
    static instanceLBill = async (dtob) => {
        let order = await LGetOrders_1.LGetOrders.getLOrder(dtob.idorder);
        if (order === null) {
            throw new logicexception_1.LogicException("The Order does not exists in the system");
        }
        let logic = new LBill_1.default(dtob.idbill, dtob.subtotal, dtob.totalb, dtob.vat, dtob.state, order, dtob.date);
        return logic;
    };
}
exports.InstanceLogicClass = InstanceLogicClass;
//# sourceMappingURL=instanceBusinessClass.js.map