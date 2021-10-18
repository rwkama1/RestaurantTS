"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCUCategory_1 = require("./maintenance/LCUCategory");
const LGetCategory_1 = require("./maintenance/LGetCategory");
class CategoryController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!CategoryController.instancia) {
            CategoryController.instancia = new CategoryController();
        }
        return CategoryController.instancia;
    }
    //************ MAINTENANCE ********************** */
    listCategories = async () => {
        let categories = await LCUCategory_1.LCUCategory.getInstance().listCategory();
        return categories;
    };
    selectCategory = async (name) => {
        let cat = await LCUCategory_1.LCUCategory.getInstance().selectCategory(name);
        return cat;
    };
    updateCategory = async (desc) => {
        let cat = await LCUCategory_1.LCUCategory.getInstance().updateCategory(desc);
        return cat;
    };
    registerCategory = async (dtc) => {
        let cat = await LCUCategory_1.LCUCategory.getInstance().registerCategory(dtc);
        return cat;
    };
    //********************* GETS ************************ */
    getLSortCategories = async () => {
        let categories = await LGetCategory_1.LGetCategory.getLSortCategories();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCategory(categories);
        return arraydto;
    };
    getLCategory = async (name) => {
        let cat = await LGetCategory_1.LGetCategory.getLCategory(name);
        if (cat === null) {
            throw new logicexception_1.LogicException("The Category does not exists in the system");
        }
        return cat.getDTO();
    };
    getLCategories = async () => {
        let cate = await LGetCategory_1.LGetCategory.getLCategories();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCategory(cate.arraycat);
        return arraydto;
    };
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map