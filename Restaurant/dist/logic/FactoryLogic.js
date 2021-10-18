"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryLogic = void 0;
const CategoryController_1 = require("./class/category_maintenance/CategoryController");
const CustomerController_1 = require("./class/customer_maintenance/CustomerController");
const UserController_1 = require("./class/user_maintenace/UserController");
class FactoryLogic {
    static UserController() {
        return (UserController_1.UserController.getInstance());
    }
    static CustomerController() {
        return (CustomerController_1.CustomerController.getInstance());
    }
    static CategoryController() {
        return (CategoryController_1.CategoryController.getInstance());
    }
}
exports.FactoryLogic = FactoryLogic;
//# sourceMappingURL=FactoryLogic.js.map