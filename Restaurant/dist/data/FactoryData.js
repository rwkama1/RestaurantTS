"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryData = void 0;
const DataCategory_1 = require("./class/DataCategory");
const DataCustomer_1 = require("./class/DataCustomer");
const DataDish_1 = require("./class/DataDish");
const DataTable_1 = require("./class/DataTable");
const DataTableCustomer_1 = require("./class/DataTableCustomer");
const DataUser_1 = require("./class/DataUser");
const DataOrder_1 = require("./class/DataOrder");
const DataBill_1 = require("./class/DataBill");
class FactoryData {
    static getDataUser() {
        return (DataUser_1.default.getInstance());
    }
    static getDataCustomer() {
        return (DataCustomer_1.default.getInstance());
    }
    static getDataCategory() {
        return (DataCategory_1.DataCategory.getInstance());
    }
    static getDataDish() {
        return (DataDish_1.DataDish.getInstance());
    }
    static getDataTable() {
        return (DataTable_1.DataTable.getInstance());
    }
    static getDataTableCustomer() {
        return (DataTableCustomer_1.DataTableCustomer.getInstance());
    }
    static getDataOrder() {
        return (DataOrder_1.DataOrder.getInstance());
    }
    static getDataBill() {
        return (DataBill_1.DataBill.getInstance());
    }
}
exports.FactoryData = FactoryData;
//# sourceMappingURL=FactoryData.js.map