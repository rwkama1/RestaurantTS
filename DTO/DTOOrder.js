const { DTOCustomer } = require("./DTOCustomer");


class DTOOrder
{
    IDOrder=0;
	DateO=new Date();
	StateO="";
	SpecialRequirement="";
	NumberPeople=0 ;
	Customer=new DTOCustomer();
  
    constructor()
    {

    }
    
   
}
module.exports = { DTOOrder };