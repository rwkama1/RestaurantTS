const { DTODish } = require("./DTODish");
const { DTOOrder } = require("./DTOOrder");


class DTOOrderDetail
{
    IDDetailO=0;
	QuantityDO=0;
	AmountDO=0;
	Order=new DTOOrder();
	Dish=new DTODish();

    constructor()
    {

    }
   
}
module.exports = { DTOOrderDetail };