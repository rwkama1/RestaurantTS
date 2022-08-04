const { DTOCustomer } = require("./DTOCustomer");
const { DTOTable } = require("./DTOTable");


class DTOTableCustomer
{
    IDTableC=0;
    Table=new DTOTable();
    Customer=new DTOCustomer();
    
    constructor()
    {

    }
  
}
module.exports = { DTOTableCustomer };