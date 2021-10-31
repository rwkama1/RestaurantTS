"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOOrder_1 = require("../../../shared/entity/DTOOrder");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetDish_1 = require("../dish_maintenance/maintenance/LGetDish");
const LDetailOrder_1 = require("./LDetailOrder");
class LogicOrder {
    _idorder;
    _dateorder;
    _stateorder;
    _specialrequirements;
    _numberpeople;
    _customer;
    _detailorders;
    //GETTERS
    get idorder() {
        return this._idorder;
    }
    get dateorder() {
        return this._dateorder;
    }
    get stateorder() {
        return this._stateorder;
    }
    get specialrequirements() {
        return this._specialrequirements;
    }
    get numberpeople() {
        return this._numberpeople;
    }
    get customer() {
        return this._customer;
    }
    get detailorders() {
        return this._detailorders;
    }
    //SETTERS
    set idorder(value) {
        this._idorder = value;
    }
    set dateorder(value) {
        this._dateorder = value;
    }
    set stateorder(value) {
        if (value.trim() != "Pending" && value.trim() != "Confirmed" && value.trim() != "Cashed" && value.trim() != "Canceled") {
            throw new logicexception_1.LogicException("The state can only be Pending,Confirmed,Canceled and Cashed");
        }
        this._stateorder = value;
    }
    set specialrequirements(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The Special Requirements cannot be empty");
        }
        this._specialrequirements = value;
    }
    set numberpeople(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The Number of People must be grater than 0");
        }
        this._numberpeople = value;
    }
    set customer(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Customer does not exists in the system");
        }
        this._customer = value;
    }
    set detailorders(value) {
        this._detailorders = value;
    }
    register = (date, specialr, npeople) => {
        this.dateorder = date;
        this.specialrequirements = specialr;
        this.numberpeople = npeople;
        return this.getDTO();
    };
    calculateTotal = () => {
        let total = 0;
        for (let dorder of this.detailorders) {
            total = total + dorder.amountdo;
        }
        return total;
    };
    ///*************** DETAIL ORDERS ******************     */
    registerDetailOrder = async (id, quantity) => {
        let lengtharraydo = this.detailorders.length + 1;
        let ldish = await LGetDish_1.LGetDish.getLDish(id);
        let ldetailorder = new LDetailOrder_1.default(lengtharraydo, quantity, 40, ldish);
        this.detailorders.push(ldetailorder);
        return ldetailorder.getDTO();
    };
    removeDetailOrder = (iddorder) => {
        let listdetailorder = this.detailorders;
        for (let i = 0; i < listdetailorder.length; i++) {
            if (listdetailorder[i].iddetailorder === iddorder) {
                listdetailorder.splice(i, 1);
                break;
            }
        }
        return true;
    };
    updateDetailOrder = async (iddetailo, iddish, quantity) => {
        for (let ldetailo of this.detailorders) {
            if (ldetailo.iddetailorder === iddetailo) {
                await ldetailo.update(iddish, quantity);
                return this.getDTO();
            }
        }
    };
    getDTO = () => {
        let arraydo = [];
        for (let ldorder of this.detailorders) {
            let dtodo = ldorder.getDTO();
            arraydo.push(dtodo);
        }
        let dto = new DTOOrder_1.default(this.idorder, this.dateorder, this.stateorder, this.specialrequirements, this.numberpeople, this.customer.id, arraydo);
        return dto;
    };
    constructor(pidorder, pdateorder, pstateorder, pspecialrqueriments, pnumberpeople, pcustomer, pdetailorders) {
        this.idorder = pidorder;
        this.dateorder = pdateorder;
        this.stateorder = pstateorder;
        this.specialrequirements = pspecialrqueriments;
        this.numberpeople = pnumberpeople;
        this.customer = pcustomer;
        this.detailorders = pdetailorders;
    }
}
exports.default = LogicOrder;
//# sourceMappingURL=LOrder.js.map