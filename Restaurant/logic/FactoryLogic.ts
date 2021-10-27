
import { CategoryController } from "./class/category_maintenance/CategoryController";
import { CustomerController } from "./class/customer_maintenance/CustomerController";
import { DishController } from "./class/dish_maintenance/DishController";
import { OrderController } from "./class/order_maintenance/OrderController";
import { TableCustomerController } from "./class/tablecustomer_maintenance/TableCustomerController";
import { TableController } from "./class/table_maintenance/TableController";
import { UserController } from "./class/user_maintenace/UserController";
import ICategoryController from "./interfaces/ICategoryController";
import ICustomerController from "./interfaces/ICustomerController";
import IDishController from "./interfaces/IDishController";
import IOrderController from "./interfaces/IOrderController";
import ITableController from "./interfaces/ITableController";
import ITableCustomerController from "./interfaces/ITableCustomerController";

import IUserController from "./interfaces/IUserController";

export class FactoryLogic {
    
    public static UserController(): IUserController {
        return (UserController.getInstance());
    }
    public static CustomerController(): ICustomerController {
        return (CustomerController.getInstance());
    }
    public static CategoryController(): ICategoryController {
        return (CategoryController.getInstance());
    }
    public static DishController(): IDishController {
        return (DishController.getInstance());
    }
    public static TableController(): ITableController {
        return (TableController.getInstance());
    }
    public static TableCustomerController(): ITableCustomerController {
        return (TableCustomerController.getInstance());
    }
    public static OrderController(): IOrderController {
        return (OrderController.getInstance());
    }
}