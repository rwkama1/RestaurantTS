const { DataDish } = require("../data/DataDish");
const { DataOrder } = require("../data/DataOrder");
const { DTODish } = require("../DTO/DTODish");
const { DTOOrderDetail } = require("../DTO/DTOOrderDetail");

class Order
{

    //#region Properties

     static _disharray = [];
    static get disharray() {
        return this._disharray;
    }
    static set disharray(value) {
        this._disharray = value;
    }

   
    //#endregion

  //#region Order
  
    static registerDish=(iddish,costd,quantity)=>
    {

        let arraydish=this.disharray;
     
        let existdisdh=this.searchIDDish(iddish);
 
        if (existdisdh!=0) {
          return -1 //Dish already exist
        } 
        else
        {
         arraydish.push({iddish,costd,quantity,amount:(costd*quantity)});
         return 1
        }

       
    }
   

    //************************************ */

    static removeIDDish(id)
    {
        let arraydish=this.disharray;
        if(arraydish!=[])
        {
            if (this.searchIDDish(id)===0) {
                throw new Error("That dish id does not exist in the list");
              } 
             for( var i = 0; i < arraydish.length; i++){ 
    
                if ( arraydish[i].iddish === id) { 
            
                    arraydish.splice(i, 1); 
                }
            
            }
            return 1
        }
        else
        {
           return -1
        }
    }
     static  getDishArray()
    {
        if(this.disharray!=[])
        {
            return this.disharray;
             
        }
        else
        {
           return -1
        }
    }
     static cleanIDDishArray()
    {
        if(this.disharray!=[])
        {
            this.disharray=[];
            return 1
             
        }
        else
        {
           return -1
        }
    }
    static searchIDDish(id)
    {
        let iddish=0;
        let arraydish=this.disharray;
        for (let index = 0; index < arraydish.length; index++) {
            const element = arraydish[index];
            if (element.iddish===id) {
                iddish=element.IDDishh;
            }
            
        }
       return iddish;
    }
    //#endregion

}
module.exports = { Order };