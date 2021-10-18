import DTODish from "../../shared/entity/DTODish";
import { DataException } from "../../shared/exceptions/dataexception";
import IDataDish from "../interfaces/IDataDish";
import { VarChar,Int,Money } from "mssql";
import { Conection } from "../Conection";
import DTODishC from "../../shared/entity/DTODishC";

export class DataDish implements IDataDish
{
      
    private static instancia: DataDish;
    private constructor() { }
    public static getInstance(): DataDish {
        if (!DataDish.instancia) {
            DataDish.instancia = new DataDish();
        }

        return DataDish.instancia;
    }
    registerDish=async(dtodish:DTODish)=>
    {
      try {
        let queryinsert = "insert into Dish values (@IDD,@NameD,@NameC,@DescriptionD,@ImgD,@PriceD)";
        let queryinsert2 = "insert into Dish_Characteristics values (@IDDC,@IDDish,@CharacteristicDC)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDD', Int, dtodish.iddish)
          .input('NameD', VarChar, dtodish.name)
          .input('NameC', VarChar, dtodish.category)
          .input('DescriptionD', VarChar, dtodish.description)
          .input('ImgD', VarChar, dtodish.img)
          .input('PriceD', Money, dtodish.price)
        .query(queryinsert)
                
          for(let dishc of dtodish.arraycharact)
          {
            const result2 = await pool.request()
            .input('IDDC', Int, dishc.iddishc)
            .input('IDDish', Int, dtodish.iddish)
            .input('CharacteristicDC', VarChar, dishc.characteristic)
          
            .query(queryinsert2)
          }
          pool.close();    
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateDish=async(dtodish:DTODish)=>
    {
      try {
        let queryupdate = "Update Dish Set NameD=@NameD,NameC=@NameC,DescriptionD=@DescriptionD,ImgD=@ImgD,PriceD=@PriceD where IDD=@IDD";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDD', Int, dtodish.iddish)
          .input('NameD', VarChar, dtodish.name)
          .input('NameC', VarChar, dtodish.category)
          .input('DescriptionD', VarChar, dtodish.description)
          .input('ImgD', VarChar, dtodish.img)
          .input('PriceD', Money, dtodish.price)
        .query(queryupdate)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }  
    getDishes=async()=>
    {
      try {
          let queryget = "select * from Dish"
          let pool = await Conection.conection();
          let arraydish=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtodish = new DTODish(x.IDD,x.NameD,x.NameC,
                x.DescriptionD,x.ImgD,x.PriceD,await this.getDishCharacteristics(x.IDD));
              arraydish.push(dtodish);
           }
          pool.close();
          return arraydish;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     //****************************************************** */
     getDishCharacteristics=async(numberdish:number)=>
     {
      try {
        let queryget = "select * from Dish_Characteristics where IDDish=@IDDish";
        let pool = await Conection.conection();
        let arraydish=[];
        const result = await pool.request()
        .input('IDDish', Int, numberdish)
        .query(queryget)
        for (let x of result.recordset) {
            let dtodishc = new DTODishC(x.IDDC,x.CharacteristicDC);
            arraydish.push(dtodishc);
         }
        pool.close();
        return arraydish;
    }
    catch(e)
    {
        throw new DataException("DataLayer Error: "+e.message)
    }
     }
     updateDishCharacteristic=async(dtodish:DTODish)=>
     {
       try {
         let queryupdate = "Update Dish_Characteristics Set CharacteristicDC=@CharacteristicDC where IDD=@IDD and IDDish=@IDDish";
           let pool = await Conection.conection();
           for(let dishc of dtodish.arraycharact)
           {
             const result2 = await pool.request()
             .input('IDDC', Int, dishc.iddishc)
             .input('IDDish', Int, dtodish.iddish)
             .input('CharacteristicDC', VarChar, dishc.characteristic)
           
             .query(queryupdate)
           }
           pool.close();
           return true;
          
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
   
     }

}