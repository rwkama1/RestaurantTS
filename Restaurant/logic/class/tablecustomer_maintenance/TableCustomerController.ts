
import ITableCustomerController from "../../interfaces/ITableCustomerController";

export class TableCustomerController implements ITableCustomerController
{

    private static instancia: TableCustomerController;
    private constructor() { }
    public static getInstance(): TableCustomerController {
        if (!TableCustomerController.instancia) {
            TableCustomerController.instancia = new TableCustomerController();
        }

        return TableCustomerController.instancia;
    }
}