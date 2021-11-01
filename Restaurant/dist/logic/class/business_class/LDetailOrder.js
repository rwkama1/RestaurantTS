"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODetailOrder_1 = require("../../../shared/entity/DTODetailOrder");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetDish_1 = require("../dish_maintenance/maintenance/LGetDish");
class LogicDetailOrder {
    _iddetailorder;
    _quantitydo;
    _amountdo;
    _dish;
    //GETTERS
    get iddetailorder() {
        return this._iddetailorder;
    }
    get quantitydo() {
        return this._quantitydo;
    }
    get amountdo() {
        return this._amountdo;
    }
    get dish() {
        return this._dish;
    }
    //SETTERS
    set iddetailorder(value) {
        this._iddetailorder = value;
    }
    set quantitydo(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The Quantity must be grater than 0");
        }
        this._quantitydo = value;
    }
    set dish(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Dish does not exists in the system");
        }
        this._dish = value;
    }
    set amountdo(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The Amount must be grater than 0");
        }
        let amount = this.quantitydo * this.dish.price;
        this._amountdo = amount;
    }
    update = async (iddish, quantity) => {
        let ldish = await LGetDish_1.LGetDish.getLDishWithoutI(iddish);
        this.dish = ldish;
        this.quantitydo = quantity;
    };
    getDTO = () => {
        let dto = new DTODetailOrder_1.default(this.iddetailorder, this.quantitydo, this.amountdo, this.dish.iddish);
        return dto;
    };
    constructor(piddetailorder, pquantitydo, pamountdo, pdish) {
        this.iddetailorder = piddetailorder;
        this.dish = pdish;
        this.quantitydo = pquantitydo;
        this.amountdo = pamountdo;
    }
}
exports.default = LogicDetailOrder;
//# sourceMappingURL=LDetailOrder.js.map