"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODish_1 = require("../../../shared/entity/DTODish");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetCategory_1 = require("../category_maintenance/maintenance/LGetCategory");
const LGetDish_1 = require("../dish_maintenance/maintenance/LGetDish");
const LDishC_1 = require("./LDishC");
class LogicDish {
    _iddish;
    _name;
    _category;
    _description;
    _img;
    _price;
    _arraydishc;
    _cost;
    _quantity;
    //GETTERS 
    get iddish() {
        return this._iddish;
    }
    get name() {
        return this._name;
    }
    get category() {
        return this._category;
    }
    get description() {
        return this._description;
    }
    get img() {
        return this._img;
    }
    get price() {
        return this._price;
    }
    get arraydishc() {
        return this._arraydishc;
    }
    get cost() {
        return this._cost;
    }
    get quantity() {
        return this._quantity;
    }
    //SETTERS
    set iddish(value) {
        this._iddish = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set category(value) {
        this._category = value;
    }
    set description(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The description cannot be empty");
        }
        this._description = value;
    }
    set img(value) {
        if (!(value.trim().match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))) {
            throw new logicexception_1.LogicException("Only images files are allowed");
        }
        this._img = value;
    }
    set price(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The price must be greater than 0");
        }
        this._price = value;
    }
    set arraydishc(value) {
        this._arraydishc = value;
    }
    set cost(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The cost must be greater than 0");
        }
        this._cost = value;
    }
    set quantity(value) {
        if (value < 1) {
            throw new logicexception_1.LogicException("The quantity must be greater than 0");
        }
        this._quantity = value;
    }
    register = async () => {
        let listdishes = await LGetDish_1.LGetDish.getLDishes();
        let listlength = listdishes.arraydish.length;
        this.iddish = listlength + 1;
        this.arraydishc = [];
        return this.getDTO();
    };
    update = async (dtodish) => {
        let searchcategory = await LGetCategory_1.LGetCategory.getLCategory(dtodish.category);
        if (searchcategory === null) {
            throw new logicexception_1.LogicException("The Category does not exists");
        }
        this.name = dtodish.name;
        this.category = searchcategory;
        this.description = dtodish.description;
        this.img = dtodish.img;
        this.price = dtodish.price;
        this.quantity = dtodish.quantity;
        return this.getDTO();
    };
    calculateCost = () => {
        let totalcost = 0;
        for (let ldishi of this.arraydishc) {
            totalcost = totalcost + ldishi.calculateAmount();
        }
        this.cost = totalcost;
        return this.cost;
    };
    //******************* INGREDIENTS ***********************  */
    registerIngredient = async (dtodishi) => {
        let lengtharrayi = this.arraydishc.length;
        this.arraydishc.push(new LDishC_1.default(lengtharrayi, dtodishi.namei, dtodishi.costi, dtodishi.quantity));
        this.cost = this.calculateCost();
        return this.getDTO();
    };
    removeIngredient = async (iding) => {
        let listingredients = this.arraydishc;
        for (let i = 0; i < listingredients.length; i++) {
            if (listingredients[i].iddishc === iding) {
                listingredients.splice(i, 1);
                break;
            }
        }
        this.cost = this.calculateCost();
        return this.getDTO();
    };
    updateIngredient = async (dtodishi) => {
        for (let ldishi of this.arraydishc) {
            if (ldishi.iddishc === dtodishi.iddishc) {
                ldishi.update(dtodishi);
                return ldishi.getDTO();
            }
        }
    };
    searchIngredient = async (idingredient) => {
        for (let ldishi of this.arraydishc) {
            if (ldishi.iddishc === idingredient) {
                return ldishi;
            }
        }
        return null;
    };
    getDTO = () => {
        let arraydtodishc = [];
        for (let ldishc of this.arraydishc) {
            let dtodishc = ldishc.getDTO();
            arraydtodishc.push(dtodishc);
        }
        let dtodish = new DTODish_1.default(this.iddish, this.name, this.category.name, this.description, this.img, this.price, arraydtodishc, this.cost, this.quantity);
        return dtodish;
    };
    constructor(piddish, pname, pcategory, pdescription, pimg, pprice, parraydishc, pcost, pquantity) {
        this.iddish = piddish;
        this.name = pname;
        this.category = pcategory;
        this.description = pdescription;
        this.img = pimg;
        this.price = pprice;
        this.arraydishc = parraydishc;
        this.cost = pcost;
        this.quantity = pquantity;
    }
}
exports.default = LogicDish;
//# sourceMappingURL=LDish.js.map