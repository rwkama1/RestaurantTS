const { DTOCategory } = require("./DTOCategory");

class DTODish
{
    IDDishh=0;
	NameD="";
	Category=new DTOCategory(); 
	DescriptionD="";
	ImgD="";
	PriceD=0;
	CostD=0;
	QuantityAD=0;

    constructor()
    {
   
    }
  
}
module.exports = { DTODish };



