import { Conection } from "../Conection";
import IDataOrder from "../interfaces/IDataOrder";
import { VarChar,Int } from "mssql";
import { DataException } from "../../shared/exceptions/dataexception";
import DTODeatilOrder from "../../shared/entity/DTODetailOrder";
import DTOOrder from "../../shared/entity/DTOOrder";
export class DataOrder implements IDataOrder{

    private static instancia: DataOrder;
    private constructor() { }
    public static getInstance(): DataOrder {
        if (!DataOrder.instancia) {
            DataOrder.instancia = new DataOrder();
        }

        return DataOrder.instancia;
    }
    getOrders=async()=>
    {
      try {
          let queryget = "select * from Orderr"
          let pool = await Conection.conection();
          let arrayo:DTOOrder[]=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let order = new DTOOrder(x.IDO,x.DateO,x.StateO,x.SpecialRequirement
                ,x.NumberPeople,x.IDCustomer,await this.getDeailOrders(x.IDO));
              arrayo.push(order);
           }
          pool.close();
          return arrayo;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     getDeailOrders=async(idorder:number)=>
    {
      try {
          let queryget = "select * from DetailOrder where IDO=@IDO";
          let pool = await Conection.conection();
          let arraydo:DTODeatilOrder[]=[];
          const result = await pool.request()
          .input('IDO', Int, idorder)
          .query(queryget)
          for (let x of result.recordset) {
              let detailo = new DTODeatilOrder(x.IDDO,x.QuantityDO,x.AmountDO,x.IDDish);
              arraydo.push(detailo);
           }
          pool.close();
          return arraydo;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}