export class LCUCategory {

    private static instancia: LCUCategory;
    private constructor() { }
    public static getInstance(): LCUCategory {
        if (!LCUCategory.instancia) {
            LCUCategory.instancia = new LCUCategory();
        }
  
        return LCUCategory.instancia;
    }
}