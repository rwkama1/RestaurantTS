
import DTOBill from "../../../shared/entity/DTOBill";
import DTOCategory from "../../../shared/entity/DTOCategory";
import DTOCustomer from "../../../shared/entity/DTOCustomer";

import DTODish from "../../../shared/entity/DTODish";
import DTOOrder from "../../../shared/entity/DTOOrder";
import DTOTable from "../../../shared/entity/DTOTable";
import DTOTableCustomer from "../../../shared/entity/DTOTableCustomer";
import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import LogicBill from "../business_class/LBill";
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
import { LGetOrders } from "../order_maintenance/maintenance/LGetOrders";
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
        let searchcategory;
         let dtodishc;
         let logicdish; 
        for( dtodishc of dtodish.arraycharact)
        {
            arrayldishc.push(new LogicDishC(dtodishc.iddishc,dtodishc.namei,dtodishc.costi,dtodishc.quantity));
        }
         searchcategory=await LGetCategory.getLCategory(dtodish.category);
        if(searchcategory===null)
        {
            throw new LogicException("The Category does not exists");
            
        }
         logicdish=new LogicDish(dtodish.iddish,dtodish.name,searchcategory,
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
        let ldish;
        let ldetailo;
        let lcustomer;
        let logicorder;
        let dtodo;
        for( dtodo of dtoorder.detailorders)
        {
             ldish=await LGetDish.getLDishWithoutI(dtodo.iddish);
            if (ldish===null) {
                throw new LogicException("The Dish does not exists in the system");
                
            }
            ldetailo=new LogicDetailOrder(dtodo.iddetailorder,dtodo.quantitydo,dtodo.amountdo,ldish);
            arraydetailo.push(ldetailo);
        }
         lcustomer= await LGetCustomer.getLCustomer(dtoorder.idcustomer);
        if (lcustomer===null) {
            throw new LogicException("The Customer does not exists in the system");
            
        }
         logicorder=new LogicOrder(dtoorder.idorder,dtoorder.dateorder,dtoorder.stateorder,dtoorder.specialrequirements,dtoorder.numberpeople,
            lcustomer,arraydetailo);
        return logicorder
    }
    static instanceLBill=async(dtob:DTOBill)=>
    { 
        let order=await LGetOrders.getLOrder(dtob.idorder);
        if(order===null)
        {
            throw new LogicException("The Order does not exists in the system");
            
        }
        let logic=new LogicBill(dtob.idbill,dtob.subtotal,dtob.totalb,dtob.vat,dtob.state,order,dtob.date);
        return logic
    }

    
}