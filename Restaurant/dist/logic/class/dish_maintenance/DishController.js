"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishController = void 0;
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCUDish_1 = require("./maintenance/LCUDish");
const LCUIngredients_1 = require("./maintenance/LCUIngredients");
const LGetDish_1 = require("./maintenance/LGetDish");
class DishController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DishController.instancia) {
            DishController.instancia = new DishController();
        }
        return DishController.instancia;
    }
    //************ MAINTENANCE ********************** */
    listDishes = async () => {
        let dishes = await LCUDish_1.LCUDish.getInstance().listDishes();
        return dishes;
    };
    selectDish = async (id) => {
        let dish = await LCUDish_1.LCUDish.getInstance().selectDish(id);
        return dish;
    };
    updateDish = async (dtodish) => {
        let dish = await LCUDish_1.LCUDish.getInstance().updateDish(dtodish);
        return dish;
    };
    //****************************** */
    enterDataDish = async (dtodish) => {
        let dish = await LCUDish_1.LCUDish.getInstance().enterDataDish(dtodish);
        return dish;
    };
    registerDIngredient = async (dtoing) => {
        let dish = await LCUDish_1.LCUDish.getInstance().registerDIngredient(dtoing);
        return dish;
    };
    removeDIngredient = async (idingre) => {
        let dish = await LCUDish_1.LCUDish.getInstance().removeDIngredient(idingre);
        return dish;
    };
    saveDishDB = async (pricedish) => {
        let dish = await LCUDish_1.LCUDish.getInstance().saveDishDB(pricedish);
        return dish;
    };
    //*********************** GETS   ************************** */
    getDish = async (id) => {
        let getdish = await LGetDish_1.LGetDish.getLDish(id);
        return getdish.getDTO();
    };
    searchLDishCategory = async (name) => {
        let getdish = await LGetDish_1.LGetDish.searchLDishCategory(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortDishbyName = async () => {
        let getdish = await LGetDish_1.LGetDish.sortDishbyName();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortbyDishCategoryName = async () => {
        let getdish = await LGetDish_1.LGetDish.sortbyDishCategoryName();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortbyDishPriceAscending = async () => {
        let getdish = await LGetDish_1.LGetDish.sortbyDishPriceAscending();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortbyDishPriceDescending = async () => {
        let getdish = await LGetDish_1.LGetDish.sortbyDishPriceDescending();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortbyCost = async () => {
        let getdish = await LGetDish_1.LGetDish.sortbyCost();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    sortbyQuantity = async () => {
        let getdish = await LGetDish_1.LGetDish.sortbyQuantity();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish);
        return arraydto;
    };
    getDishes = async () => {
        let getdish = await LGetDish_1.LGetDish.getLDishes();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(getdish.arraydish);
        return arraydto;
    };
    //*********************** INGREDIENTS ************************ */
    listDishesI = async () => {
        let dishes = await LCUIngredients_1.LCUIngredients.getInstance().listDishes();
        return dishes;
    };
    selectDishI = async (id) => {
        let dish = await LCUIngredients_1.LCUIngredients.getInstance().selectDish(id);
        return dish;
    };
    //************* UPDATE **** */
    selectIngredient = async (idingredient) => {
        let ing = await LCUIngredients_1.LCUIngredients.getInstance().selectIngredient(idingredient);
        return ing;
    };
    updateIngredient = async (dtoing) => {
        let ing = await LCUIngredients_1.LCUIngredients.getInstance().updateIngredient(dtoing);
        return ing;
    };
    updateCost = async () => {
        let ing = await LCUIngredients_1.LCUIngredients.getInstance().updateCost();
        return ing;
    };
    updateDishI = async () => {
        let ing = await LCUIngredients_1.LCUIngredients.getInstance().updateDish();
        return ing;
    };
    //********* REGISTER **** */
    registerIngredient = async (dtoing) => {
        let ing = await LCUIngredients_1.LCUIngredients.getInstance().registerIngredient(dtoing);
        return ing;
    };
}
exports.DishController = DishController;
//# sourceMappingURL=DishController.js.map