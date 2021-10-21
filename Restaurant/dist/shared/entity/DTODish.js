"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTODish {
    iddish;
    name;
    category;
    description;
    img;
    price;
    arraycharact;
    cost;
    quantity;
    constructor(piddish, pname, pcategory, pdescription, pimg, pprice, parraycharact, pcost, pquantity) {
        this.iddish = piddish;
        this.name = pname;
        this.category = pcategory;
        this.description = pdescription;
        this.img = pimg;
        this.price = pprice;
        this.arraycharact = parraycharact;
        this.cost = pcost;
        this.quantity = pquantity;
    }
}
exports.default = DTODish;
//# sourceMappingURL=DTODish.js.map