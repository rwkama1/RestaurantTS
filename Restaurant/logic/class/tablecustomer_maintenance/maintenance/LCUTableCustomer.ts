export class LCUTableCustomer
{

    private static instancia: LCUTableCustomer;
    private constructor() { }
    public static getInstance(): LCUTableCustomer {
        if (!LCUTableCustomer.instancia) {
            LCUTableCustomer.instancia = new LCUTableCustomer();
        }

        return LCUTableCustomer.instancia;
    }
  
}