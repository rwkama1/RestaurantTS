
import DTOCategory from "../../../shared/entity/DTOCategory";
import DTOCustomer from "../../../shared/entity/DTOCustomer";
import DTODish from "../../../shared/entity/DTODish";
import DTOOrder from "../../../shared/entity/DTOOrder";
import DTOTable from "../../../shared/entity/DTOTable";
import DTOTableCustomer from "../../../shared/entity/DTOTableCustomer";
import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import LogicCategory from "../business_class/LCategory";
import LogicCustomer from "../business_class/LCustomer";
import LogicDetailOrder from "../business_class/LDetailOrder";
import LogicDish from "../business_class/LDish";
import LogicDishC from "../business_class/LDishC";
import LogicOrder from "../business_class/LOrder";
import LogicTable from "../business_class/LTable";
import LogicTableCustomer from "../business_class/LTableCustomer";

import LogicUser from "../business_class/LUser";
import { LGetCategory } from "../category_maintenance/maintenance/LGetCategory";
import { LGetCustomer } from "../customer_maintenance/maintenance/LGetsCustomer";
import { LGetDish } from "../dish_maintenance/maintenance/LGetDish";
import { LGetTable } from "../table_maintenance/maintenance/LGetTable";


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
        var logicustomer=new LogicCustomer(dtc.id,dtc.name,dtc.lastname);
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
    static instanceLTableCustomer=async(dtotc:DTOTableCustomer)=>
    { 
        let table=await LGetTable.getLTable(dtotc.idtable);
        if(table===null)
        {
            throw new LogicException("The Table does not exists in the system");
            
        }
        let customer=await LGetCustomer.getLCustomer(dtotc.idcustomer);
        if(customer===null)
        {
            throw new LogicException("The Customer does not exists in the system");
            
        }
        let logic=new LogicTableCustomer(dtotc.idtc,table,customer);
        return logic
    }
    static instanceLOrder=async(dtoorder:DTOOrder)=>
    {
        let arraydetailo:LogicDetailOrder[]=[];
        for(let dtodo of dtoorder.detailorders)
        {
            let ldish=await LGetDish.getLDish(dtodo.iddish);
            if (ldish===null) {
                throw new LogicException("The Dish does not exists in the system");
                
            }
            arraydetailo.push(new LogicDetailOrder(dtodo.iddetailorder,dtodo.quantitydo,dtodo.amountdo,ldish));
        }
        let lcustomer= await LGetCustomer.getLCustomer(dtoorder.idcustomer);
        if (lcustomer===null) {
            throw new LogicException("The Customer does not exists in the system");
            
        }
        let logicorder=new LogicOrder(dtoorder.idorder,dtoorder.dateorder,dtoorder.stateorder,dtoorder.specialrequirements,dtoorder.numberpeople,
            lcustomer,arraydetailo);
        return logicorder
    }

    
}