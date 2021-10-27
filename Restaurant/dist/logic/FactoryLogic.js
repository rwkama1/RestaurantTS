"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryLogic = void 0;
const CategoryController_1 = require("./class/category_maintenance/CategoryController");
const CustomerController_1 = require("./class/customer_maintenance/CustomerController");
const DishController_1 = require("./class/dish_maintenance/DishController");
const OrderController_1 = require("./class/order_maintenance/OrderController");
const TableCustomerController_1 = require("./class/tablecustomer_maintenance/TableCustomerController");
const TableController_1 = require("./class/table_maintenance/TableController");
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
    static DishController() {
        return (DishController_1.DishController.getInstance());
    }
    static TableController() {
        return (TableController_1.TableController.getInstance());
    }
    static TableCustomerController() {
        return (TableCustomerController_1.TableCustomerController.getInstance());
    }
    static OrderController() {
        return (OrderController_1.OrderController.getInstance());
    }
}
exports.FactoryLogic = FactoryLogic;
//# sourceMappingURL=FactoryLogic.js.map