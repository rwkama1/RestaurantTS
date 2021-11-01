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
        let queryinsert = "insert into Dish values (@IDD,@NameD,@NameC,@DescriptionD,@ImgD,@PriceD,@CostD,@QuantityAD)";
        let queryinsert2 = "insert into Ingredient values (@IDDC,@IDDish,@NameI,@CostI,@QuantityI)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDD', Int, dtodish.iddish)
          .input('NameD', VarChar, dtodish.name)
          .input('NameC', VarChar, dtodish.category)
          .input('DescriptionD', VarChar, dtodish.description)
          .input('ImgD', VarChar, dtodish.img)
          .input('PriceD', Money, dtodish.price)
          .input('CostD', Money, dtodish.cost)
          .input('QuantityAD', Int, dtodish.quantity)
        .query(queryinsert)
                
          for(let dishc of dtodish.arraycharact)
          {
            const result2 = await pool.request()
            .input('IDDC', Int, dishc.iddishc)
            .input('IDDish', Int, dtodish.iddish)
            .input('NameI', VarChar, dishc.namei)
            .input('CostI', Money, dishc.costi)
            .input('QuantityI', Int, dishc.quantity)
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
        let queryupdate2 = "Update Ingredient Set NameI=@NameI,CostI=@CostI,QuantityI=@QuantityI where IDDC=@IDDC and IDDish=@IDDish";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDD', Int, dtodish.iddish)
          .input('NameD', VarChar, dtodish.name)
          .input('NameC', VarChar, dtodish.category)
          .input('DescriptionD', VarChar, dtodish.description)
          .input('ImgD', VarChar, dtodish.img)
          .input('PriceD', Money, dtodish.price)
         
        .query(queryupdate)
                
        for(let dishc of dtodish.arraycharact)
        {
          const result2 = await pool.request()
          .input('IDDC', Int, dishc.iddishc)
          .input('IDDish', Int, dtodish.iddish)
          .input('NameI', VarChar, dishc.namei)
          .input('CostI', Money, dishc.costi)
          .input('QuantityI', Int, dishc.quantity)
          .query(queryupdate2)
        }
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
          let pool3 = await Conection.conection();
          let arraydish=[];
          const result = await pool3.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtodish = new DTODish(x.IDD,x.NameD,x.NameC,
                x.DescriptionD,x.ImgD,x.PriceD,await this.getDishIngredients(x.IDD),x.CostD,x.QuantityAD);
              arraydish.push(dtodish);
           }
           pool3.close();
          return arraydish;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     getDishesWithoutI=async()=>
    {
      try {
          let queryget = "select * from Dish"
          let pooldi = await Conection.conection();
          let arraydish=[];
          const result = await pooldi.request()
          .query(queryget)
          for (let x of result.recordset) {
              let dtodish = new DTODish(x.IDD,x.NameD,x.NameC,
                x.DescriptionD,x.ImgD,x.PriceD,[],x.CostD,x.QuantityAD);
              arraydish.push(dtodish);
           }
           pooldi.close();
          return arraydish;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
    updateCost=async(dtodish:DTODish)=>
     {
       try {
         let queryupdate = "Update Dish Set CostD=@CostD where IDD=@IDD";
        
           let pool = await Conection.conection();
           const result = await pool.request()
           .input('IDD', Int, dtodish.iddish)
           .input('CostD', Money, dtodish.cost)
         .query(queryupdate)
                 
        
           pool.close();
           return true;
          
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
   
     }
    updateQuantity=async(dtodish:DTODish)=>
     {
       try {
         let queryupdate = "Update Dish Set QuantityAD=@QuantityAD where IDD=@IDD";
        
           let pool = await Conection.conection();
           const result = await pool.request()
           .input('IDD', Int, dtodish.iddish)
           .input('QuantityAD', Int, dtodish.quantity)
         .query(queryupdate)
                 
        
           pool.close();
           return true;
          
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
   
     }
     //****************************************************** */
     getDishIngredients=async(numberdish:number)=>
     {
      try {
        let queryget = "select * from Ingredient where IDDish=@IDDish";
        let pool2 = await Conection.conection();
        let arraydish=[];
        const result = await pool2.request()
        .input('IDDish', Int, numberdish)
        .query(queryget)
        for (let x of result.recordset) {
            let dtodishc = new DTODishC(x.IDDC,x.NameI,x.CostI,x.QuantityI);
            arraydish.push(dtodishc);
         }
        pool2.close();
        return arraydish;
    }
    catch(e)
    {
        throw new DataException("DataLayer Error: "+e.message)
    }
     }
     addDishIngredient=async(dtodish:DTODish)=>
     {
        let listdishc=dtodish.arraycharact.length;
        let queryinsert2 = "insert into Ingredient values (@IDDC,@IDDish,@NameI,@CostI,@QuantityI)";
       try {
          
           let pool = await Conection.conection();
          
           const result2 = await pool.request()
           .input('IDDC', Int, dtodish.arraycharact[listdishc-1].iddishc)
           .input('IDDish', Int, dtodish.iddish)
           .input('NameI', VarChar, dtodish.arraycharact[listdishc-1].namei)
           .input('CostI', Money,  dtodish.arraycharact[listdishc-1].costi)
           .input('QuantityI', Int,  dtodish.arraycharact[listdishc-1].quantity)
            .query(queryinsert2)
             
           pool.close();
           return true;
          
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
   
     }
    
     
}