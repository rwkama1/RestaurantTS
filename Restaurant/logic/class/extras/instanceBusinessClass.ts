
import DTOCategory from "../../../shared/entity/DTOCategory";
import DTOCustomer from "../../../shared/entity/DTOCustomer";
import DTODish from "../../../shared/entity/DTODish";
import DTOTable from "../../../shared/entity/DTOTable";
import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import LogicCategory from "../business_class/LCategory";
import LogicCustomer from "../business_class/LCustomer";
import LogicDish from "../business_class/LDish";
import LogicDishC from "../business_class/LDishC";
import LogicTable from "../business_class/LTable";

import LogicUser from "../business_class/LUser";
import { LGetCategory } from "../category_maintenance/maintenance/LGetCategory";


export class InstanceLogicClass
{
    static instanceLUser=(dtouser:DTOUser)=>
    {
        var logicuser=new  LogicUser(dtouser.idcard,dtouser.name,dtouser.city,
            dtouser.typeuserr,dtouser.hashh,dtouser.password);
            return logicuser
    }
    static instanceLCustomer=(dtc:DTOCustomer)=>
    {
        var logicustomer=new LogicCustomer(dtc.idcard,dtc.name,dtc.lastname,dtc.town,dtc.address,dtc.phonenumber
            ,dtc.mail,dtc.salt,dtc.passwordd);
         return logicustomer
    }
    static instanceLCategory=(dtocat:DTOCategory)=>
    {
        let logiccat=new LogicCategory(dtocat.name,dtocat.description);
        return logiccat
    }
    static instanceLDish=async(dtodish:DTODish)=>
    {
        let arrayldishc=[];
        for(let dtodishc of dtodish.arraycharact)
        {
            arrayldishc.push(new LogicDishC(dtodishc.iddishc,dtodishc.namei,dtodishc.costi,dtodishc.quantity));
        }
        let searchcategory=await LGetCategory.getLCategory(dtodish.category);
        if(searchcategory===null)
        {
            throw new LogicException("The Category does not exists");
            
        }
        let logicdish=new LogicDish(dtodish.iddish,dtodish.name,searchcategory,
            dtodish.description,dtodish.img,dtodish.price,arrayldishc,dtodish.cost,dtodish.quantity);
        return logicdish
    }
    static instanceLTable=(dtot:DTOTable)=>
    { 
        let logic=new LogicTable(dtot.IDT,dtot.StateT);
        return logic
    }
    
}