
import { DataException } from "../shared/exceptions/dataexception";
import {ConnectionPool}  from "mssql";

export class Conection
{
    static conection=async () => {
        let sqlconfig = {
            user: 'rwkama62_SQLLogin_1',
            password:'15mo637g1o',
            database: 'BDRestaurant',
            server: 'BDRestaurant.mssql.somee.com',
           
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        try {
       
        const pool = await new ConnectionPool(sqlconfig).connect();
       return pool
        } catch (err) {
            throw new DataException("Conection error: "+err.message);
        
        }
       }
}

