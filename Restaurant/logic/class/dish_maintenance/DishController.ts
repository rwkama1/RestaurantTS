import IDishController from "../../interfaces/IDishController";

export class DishController implements IDishController{

    private static instancia: DishController;
    private constructor() { }
    public static getInstance(): DishController {
        if (!DishController.instancia) {
            DishController.instancia = new DishController();
        }

        return DishController.instancia;
    }
    
}