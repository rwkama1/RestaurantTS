"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUCategory = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetCategory_1 = require("./LGetCategory");
class LCUCategory {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUCategory.instancia) {
            LCUCategory.instancia = new LCUCategory();
        }
        return LCUCategory.instancia;
    }
    _categoryobj;
    get categoryobj() {
        return this._categoryobj;
    }
    set categoryobj(value) {
        this._categoryobj = value;
    }
    listCategory = async () => {
        let cs = await LGetCategory_1.LGetCategory.getLSortCategories();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCategory(cs);
        return arraydto;
    };
    selectCategory = async (name) => {
        let cat = await LGetCategory_1.LGetCategory.getLCategory(name);
        if (cat === null) {
            throw new logicexception_1.LogicException("The Category does not exists in the system");
        }
        this.categoryobj = cat;
        return this.categoryobj.getDTO();
    };
    updateCategory = async (description) => {
        if (this.categoryobj != null) {
            let datacat = await this.categoryobj.update(description);
            const updc = await FactoryData_1.FactoryData.getDataCategory().updateCategory(datacat);
            return updc;
        }
        else {
            throw new logicexception_1.LogicException("The Category does not exists in the system");
        }
    };
    //***************************************************** */
    registerCategory = async (dtc) => {
        let logicc = instanceBusinessClass_1.InstanceLogicClass.instanceLCategory(dtc);
        let cat = await LGetCategory_1.LGetCategory.getLCategory(dtc.name);
        if (cat != null) {
            throw new logicexception_1.LogicException("That Category already exists in the system");
        }
        let datac = await logicc.register();
        const regc = await FactoryData_1.FactoryData.getDataCategory().registerCategory(datac);
        return regc;
    };
}
exports.LCUCategory = LCUCategory;
//# sourceMappingURL=LCUCategory.js.map