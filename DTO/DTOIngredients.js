
const { DTODish } = require("./DTODish");


class DTOIngredients
{
    IDIngredientt=0;
	Dishh=new DTODish();
	NameI="";
	CostI=0;
	QuantityI=0;
    

    Amount()
    {
        let amount=0,cost=0,quantity=0;
        cost=this.CostI;
        quantity=this.QuantityI;
        amount=cost*quantity;
        return amount
    }

    constructor()
    {

    }
   
}
module.exports = { DTOIngredients };