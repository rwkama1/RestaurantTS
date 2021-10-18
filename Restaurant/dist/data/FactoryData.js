"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryData = void 0;
const DataCategory_1 = require("./class/DataCategory");
const DataCustomer_1 = require("./class/DataCustomer");
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
}
exports.FactoryData = FactoryData;
//# sourceMappingURL=FactoryData.js.map