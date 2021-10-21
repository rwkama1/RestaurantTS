"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUIngredients = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const LGetDish_1 = require("./LGetDish");
class LCUIngredients {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUIngredients.instancia) {
            LCUIngredients.instancia = new LCUIngredients();
        }
        return LCUIngredients.instancia;
    }
    _dishobj;
    get dishobj() {
        return this._dishobj;
    }
    set dishobj(value) {
        this._dishobj = value;
    }
    listDishes = async () => {
        let dishes = await LGetDish_1.LGetDish.getLDishes();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(dishes.arraydish);
        return arraydto;
    };
    selectDish = async (id) => {
        let dish = await LGetDish_1.LGetDish.getLDish(id);
        if (dish === null) {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
        this.dishobj = dish;
        let dtodish = this.dishobj.getDTO();
        let listingredients = dtodish.arraycharact;
        return listingredients;
    };
    //**************** UPDATE ********************* */
    selectIngredient = async (idingredient) => {
        let ingre = await this.dishobj.searchIngredient(idingredient);
        if (ingre === null) {
            throw new logicexception_1.LogicException("The Ingredient does not exists in the Dish");
        }
        return ingre.getDTO();
    };
    updateIngredient = async (dtoing) => {
        let ingre = await this.dishobj.updateIngredient(dtoing);
        return ingre;
    };
    updateCost = async () => {
        let newcost = await this.dishobj.calculateCost();
        return this.dishobj.getDTO();
    };
    updateDish = async () => {
        if (this.dishobj != null) {
            let datadish = await this.dishobj.getDTO();
            const upddish = await FactoryData_1.FactoryData.getDataDish().updateDish(datadish);
            if (upddish === true) {
                const updatecost = await FactoryData_1.FactoryData.getDataDish().updateCost(datadish);
                this.dishobj = null;
                return updatecost;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
    //******************** REGISTER  ************ */
    registerIngredient = async (dtoing) => {
        if (this.dishobj != null) {
            let ingre = await this.dishobj.registerIngredient(dtoing);
            const reging = await FactoryData_1.FactoryData.getDataDish().addDishIngredient(ingre);
            if (reging === true) {
                const updatecost = await FactoryData_1.FactoryData.getDataDish().updateCost(ingre);
                this.dishobj = null;
                return updatecost;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
}
exports.LCUIngredients = LCUIngredients;
//# sourceMappingURL=LCUIngredients.js.map