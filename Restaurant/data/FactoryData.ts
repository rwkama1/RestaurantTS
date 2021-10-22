
import { DataCategory } from "./class/DataCategory";
import DataCustomer from "./class/DataCustomer";
import { DataDish } from "./class/DataDish";
import { DataTable } from "./class/DataTable";
import DataUser from "./class/DataUser";
import IDataCategory from "./interfaces/IDataCategory";
import IDataCustomer from "./interfaces/IDataCustomer";
import IDataDish from "./interfaces/IDataDish";
import IDataTable from "./interfaces/IDataTable";
import IDataUsers from "./interfaces/IDataUser";

export class FactoryData {
    public static getDataUser(): IDataUsers {
        return (DataUser.getInstance());
    }
    public static getDataCustomer(): IDataCustomer {
        return (DataCustomer.getInstance());
    }
    public static getDataCategory(): IDataCategory {
        return (DataCategory.getInstance());
    }
    public static getDataDish(): IDataDish {
        return (DataDish.getInstance());
    }
    public static getDataTable(): IDataTable {
        return (DataTable.getInstance());
    }
   
}