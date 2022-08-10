const sql  = require("mssql");

 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama61_SQLLogin_1',
            password:'bfq84g7nbx',
            database: 'restaurantt',
            server: 'restaurantt.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };