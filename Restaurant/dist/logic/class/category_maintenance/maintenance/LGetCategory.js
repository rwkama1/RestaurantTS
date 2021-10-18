"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetCategory = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayCategory_1 = require("../../business_class/array/LArrayCategory");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetCategory {
    static getLSortCategories = async () => {
        let datac = await this.getLCategories();
        let searchc = datac.getSort();
        return searchc;
    };
    static getLCategory = async (name) => {
        let datac = await this.getLCategories();
        let searchc = datac.search(name);
        return searchc;
    };
    static getLCategories = async () => {
        let arrayc = [];
        let datac = await FactoryData_1.FactoryData.getDataCategory().getCategories();
        for (let dtc of datac) {
            const logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLCategory(dtc);
            arrayc.push(logicc);
        }
        let arraylogicc = new LArrayCategory_1.ArrayCategories(arrayc);
        return arraylogicc;
    };
}
exports.LGetCategory = LGetCategory;
//# sourceMappingURL=LGetCategory.js.map