
const { DTOOrderDetail } = require("./DTOOrderDetail");

class DTOBill
{

    IDBilll=0;
	DateB=new Date();
	SubtotalB=0;
	TotalB=0;
	VATB=0;
	StateB="";
	DetailOrder=new DTOOrderDetail();

           

    constructor()                                                                                            
    {

    }

   
}
module.exports = { DTOBill };