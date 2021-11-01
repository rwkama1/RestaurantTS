import IBillController from "../../interfaces/IBillController";

export class BillController implements IBillController{

    private static instancia: BillController;
    private constructor() { }
    public static getInstance(): BillController {
        if (!BillController.instancia) {
            BillController.instancia = new BillController();
        }

        return BillController.instancia;
    }
 }
