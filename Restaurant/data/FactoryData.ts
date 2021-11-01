
import { DataCategory } from "./class/DataCategory";
import DataCustomer from "./class/DataCustomer";
import { DataDish } from "./class/DataDish";
import { DataTable } from "./class/DataTable";
import { DataTableCustomer } from "./class/DataTableCustomer";
import DataUser from "./class/DataUser";
import { DataOrder } from "./class/DataOrder";
import IDataCategory from "./interfaces/IDataCategory";
import IDataCustomer from "./interfaces/IDataCustomer";
import IDataDish from "./interfaces/IDataDish";
import IDataOrder from "./interfaces/IDataOrder";
import IDataTable from "./interfaces/IDataTable";
import IDataTableCustomer from "./interfaces/IDataTableCustomer";
import IDataUsers from "./interfaces/IDataUser";
import IDataBill from "./interfaces/IDataBill";
import { DataBill } from "./class/DataBill";

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
    public static getDataTableCustomer(): IDataTableCustomer {
        return (DataTableCustomer.getInstance());
    }
    public static getDataOrder(): IDataOrder {
        return (DataOrder.getInstance());
    }
    public static getDataBill(): IDataBill {
        return (DataBill.getInstance());
    }
}