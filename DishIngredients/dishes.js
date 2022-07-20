
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
  
    static registerRoom=(numberroom)=>
    {
       let arrayroom=this.roomarray;
       if (arrayroom.includes(numberroom)) {
         return -1
       } 
       else
       {
        arrayroom.push(numberroom);
         return 1
       }
       
    }
    static calculateTotal=async()=>
    {
      
        let arrayroom=this.roomarray;
        if(arrayroom.length>0)
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

    static  removeNumberRoomArray(numberroom)
    {
        let arrayroom=this.roomarray;
        if(this.arrayroom!=[])
        {
            if (!arrayroom.includes(numberroom)) {
                throw new Error("That room number does not exist in the list");
              } 
             for( var i = 0; i < arrayroom.length; i++){ 
    
                if ( arrayroom[i] === numberroom) { 
            
                    arrayroom.splice(i, 1); 
                }
            
            }
            return 1
        }
        else
        {
           return -1
        }
    }
     static  getNumberRoomsArray()
    {
        if(this.roomarray!=[])
        {
            return this.roomarray;
             
        }
        else
        {
           return -1
        }
    }

     static cleanNumberRoomsArray()
    {
        if(this.roomarray!=[])
        {
            this.roomarray=[];
            return 1
             
        }
        else
        {
           return -1
        }
    }

    //#endregion

}
module.exports = { Reservation };