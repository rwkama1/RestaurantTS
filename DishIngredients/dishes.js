
class DishIngredients
{

    //#region Properties

    static _ingredientsarray = [];

    static get ingredientsarray() {
        return this._ingredientsarray;
    }
    static set ingredientsarray(value) {
        this._ingredientsarray = value;
    }


    
    //#endregion

  //#region Ingredients
  

    static registerIngredient=(name,cost,quantity)=>
    {
       
       let arrayingredients=this._ingredientsarray;
       let ingredient={name,cost,quantity};

       let existname=this.searchNameIngredient(name);

       if (existname!="") {
         return -1 //Ingredient already exist
       } 
       else
       {
         arrayingredients.push(ingredient);
         return 1
       }
       
    }
    static calculateTotal=async()=>
    {
      
        let arrayingredients=this._ingredientsarray;
        if(arrayingredients.length>0)
        {
           let getDetailReservations=await DataReservation.getDetailReservationMultipleRooms(arrayroom);
           return getDetailReservations
        }
        else
        {
           return  -1
        }
    }

    //************************************ */

    static  removeNumberRoomArray(name)
    {
        let arrayingredients=this._ingredientsarray;
        if(this.arrayingredients!=[])
        {
            if (!arrayingredients.includes(numberroom)) {
                throw new Error("That ingredient name does not exist in the list");
              } 
             for( var i = 0; i < arrayingredients.length; i++){ 
    
                if ( arrayingredients[i] === numberroom) { 
            
                    arrayingredients.splice(i, 1); 
                }
            
            }
            return 1
        }
        else
        {
           return -1
        }
    }
     static  getArrayIngredients()
    {
        if(this.ingredientsarray!=[])
        {
            return this.ingredientsarray;
             
        }
        else
        {
           return -1
        }
    }

     static clearArrayIngredients()
    {
        if(this.ingredientsarray!=[])
        {
            this.ingredientsarray=[];
            return 1
             
        }
        else
        {
           return -1
        }
    }

    static searchNameIngredient(name)
    {
        let namefound="";
        let arrayingredients=this._ingredientsarray;
        for (let index = 0; index < arrayingredients.length; index++) {
            const element = arrayingredients[index];
            if (element.name===name) {
                namefound=element.name;
            }
            
        }
       return namefound;
    }
    //#endregion

}
module.exports = { DishIngredients };