"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetDish = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayDish_1 = require("../../business_class/array/LArrayDish");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetDish {
    static getLDish = async (id) => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.search(id);
        return searchdish;
    };
    static getLDishWithoutI = async (id) => {
        let datadishes = await this.getLDishesWithoutI();
        let searchdish = datadishes.search(id);
        return searchdish;
    };
    static searchLDishCategory = async (name) => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.searchbyCategory(name);
        return searchdish;
    };
    //************************************************** */
    static sortDishbyName = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyName();
        return searchdish;
    };
    static sortbyDishCategoryName = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyCategoryName();
        return searchdish;
    };
    static sortbyDishPriceAscending = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyPriceAscending();
        return searchdish;
    };
    static sortbyDishPriceDescending = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyPriceDescending();
        return searchdish;
    };
    static sortbyCost = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyCost();
        return searchdish;
    };
    static sortbyQuantity = async () => {
        let datadishes = await this.getLDishes();
        let searchdish = datadishes.sortbyQuantity();
        return searchdish;
    };
    static getLDishes = async () => {
        let arrayd = [];
        let datad = await FactoryData_1.FactoryData.getDataDish().getDishes();
        for (var dtod of datad) {
            const logicdish = await instanceBusinessClass_1.InstanceLogicClass.instanceLDish(dtod);
            arrayd.push(logicdish);
        }
        let arraylogicdishes = new LArrayDish_1.ArrayDish(arrayd);
        return arraylogicdishes;
    };
    static getLDishesWithoutI = async () => {
        let arrayd = [];
        let datad = await FactoryData_1.FactoryData.getDataDish().getDishesWithoutI();
        for (var dtod of datad) {
            const logicdish = await instanceBusinessClass_1.InstanceLogicClass.instanceLDish(dtod);
            arrayd.push(logicdish);
        }
        let arraylogicdishes = new LArrayDish_1.ArrayDish(arrayd);
        return arraylogicdishes;
    };
}
exports.LGetDish = LGetDish;
//# sourceMappingURL=LGetDish.js.map