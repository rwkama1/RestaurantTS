
import { CategoryController } from "./class/category_maintenance/CategoryController";
import { CustomerController } from "./class/customer_maintenance/CustomerController";
import { DishController } from "./class/dish_maintenance/DishController";
import { UserController } from "./class/user_maintenace/UserController";
import ICategoryController from "./interfaces/ICategoryController";
import ICustomerController from "./interfaces/ICustomerController";
import IDishController from "./interfaces/IDishController";

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
}