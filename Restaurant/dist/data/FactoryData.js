"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryData = void 0;
const DataCategory_1 = require("./class/DataCategory");
const DataCustomer_1 = require("./class/DataCustomer");
const DataDish_1 = require("./class/DataDish");
const DataUser_1 = require("./class/DataUser");
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
}
exports.FactoryData = FactoryData;
//# sourceMappingURL=FactoryData.js.map