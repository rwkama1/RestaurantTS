"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDish = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetDish_1 = require("./LGetDish");
class LCUDish {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUDish.instancia) {
            LCUDish.instancia = new LCUDish();
        }
        return LCUDish.instancia;
    }
    _dishobj;
    get dishobj() {
        return this._dishobj;
    }
    set dishobj(value) {
        this._dishobj = value;
    }
    //****************** UPDATE *************** */
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
        return this.dishobj.getDTO();
    };
    updateDish = async (dtodish) => {
        if (this.dishobj != null) {
            let datadish = await this.dishobj.update(dtodish);
            const upddish = await FactoryData_1.FactoryData.getDataDish().updateDish(datadish);
            this.dishobj = null;
            return upddish;
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
    //******************** REGISTER ******************* */
    enterDataDish = async (dtodish) => {
        let ldish = await instanceBusinessClass_1.InstanceLogicClass.instanceLDish(dtodish);
        let datac = await ldish.register();
        this.dishobj = ldish;
        return datac;
    };
    registerDIngredient = async (dtoing) => {
        if (this.dishobj != null) {
            let datadish = await this.dishobj.registerIngredient(dtoing);
            return datadish;
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
    removeDIngredient = async (idingre) => {
        if (this.dishobj != null) {
            let datadish = await this.dishobj.removeIngredient(idingre);
            return datadish;
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
    saveDishDB = async (pricedish) => {
        if (this.dishobj != null) {
            this.dishobj.price = pricedish;
            const savedish = await FactoryData_1.FactoryData.getDataDish().registerDish(this.dishobj.getDTO());
            if (savedish === true) {
                const upcost = await FactoryData_1.FactoryData.getDataDish().updateCost(this.dishobj.getDTO());
                this.dishobj = null;
                return upcost;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
    //********************* REGISTER QUANTITY ************************* */
    addQuantity = async (quantity) => {
        if (this.dishobj != null) {
            this.dishobj.quantity = this.dishobj.quantity + quantity;
            const savedish = await FactoryData_1.FactoryData.getDataDish().updateQuantity(this.dishobj.getDTO());
            this.dishobj = null;
            return savedish;
        }
        else {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
    };
}
exports.LCUDish = LCUDish;
//# sourceMappingURL=LCUDish.js.map