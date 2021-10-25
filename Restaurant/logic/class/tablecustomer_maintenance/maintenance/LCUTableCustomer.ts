import { FactoryData } from "../../../../data/FactoryData";
import DTOCustomer from "../../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicTableCustomer from "../../business_class/LTableCustomer";
import { LCUCustomer } from "../../customer_maintenance/maintenance/LCUCustomer";
import { LGetCustomer } from "../../customer_maintenance/maintenance/LGetsCustomer";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { LGetTable } from "../../table_maintenance/maintenance/LGetTable";
import { LGetTableCustomer } from "./LGetTableCustomer";

export class LCUTableCustomer
{

    private static instancia: LCUTableCustomer;
    private constructor() { }
    public static getInstance(): LCUTableCustomer {
        if (!LCUTableCustomer.instancia) {
            LCUTableCustomer.instancia = new LCUTableCustomer();
        }

        return LCUTableCustomer.instancia;
    }
    private _customertableobj: LogicTableCustomer;

    public get customertableobj(): LogicTableCustomer {
        return this._customertableobj;
    }
    public set customertableobj(value: LogicTableCustomer) {
        this._customertableobj = value;
    }

   
  //********************** ADD WITHOUT PREVIOUS RESERVATION ******** */

    registerCustomer=async(dtc:DTOCustomer)=>
    {
        let addc=await LCUCustomer.getInstance().registerCustomer(dtc);
        return addc
        
    }  

  //********************** ADD WITH PREVIOUS RESERVATION ************ */

    listCustomers=async()=>
    {
        let customers=await LGetCustomer.getLCustomers();
        let arraydto=InstanceArrayDTO.instanceArrayCustomer(customers.arraycustomer);
        return arraydto
       
    }
    getCustomerbyExpresion=async(exp:string)=>
    {
        let customers=await LGetCustomer.getCustomerbyExpresion(exp);
        let arraydto=InstanceArrayDTO.instanceArrayCustomer(customers);
        return arraydto
       
    }  
    enterCustomer=async(id:number)=>
    {
        let newtc=new LogicTableCustomer(0,null,null);
        this.customertableobj=newtc;
        let customer=await LGetCustomer.getLCustomer(id);
        if(customer===null)
        {
            throw new LogicException("The Customer does not exists in the system");

            
        }
        let tablecustomerbyid=await LGetTableCustomer.getLTCbyCustomerId(id);
        if(tablecustomerbyid!=null)
        {
            throw new LogicException("That Customer already has a table");
  
        }
        this.customertableobj.customer=customer;
        return this.customertableobj.customer.getDTO();
       
    }  
    listAvailableTable=async()=>
    {
        let tables=await LGetTable.getLAvailableTables();
        let arraydto=InstanceArrayDTO.instanceArrayTable(tables);
        return arraydto
       
    }
    enterTable=async(id:number)=>
    {
        let table=await LGetTable.getLTable(id);
        if(table===null)
        {
            throw new LogicException("The Table does not exists in the system");
             
        }
        if(table.statetable==="Busy")
        {
            throw new LogicException("That Table is Busy");
             
        }
        this.customertableobj.table=table;
        return this.customertableobj.table.getDTO();
       
    }  
    registerTableCustomer=async()=>
    {
        this.customertableobj.idtc=0;
        this.customertableobj.table.statetable="Busy";
        let dto=this.customertableobj.getDTO();
        let addtc=await FactoryData.getDataTableCustomer().registerTableCustomer(dto);
        if(addtc===true)
        {
            let changestate=await FactoryData.getDataTable().changeState(this.customertableobj.table.getDTO());
            return changestate;
        }

       
    }  
   
  //************************** DELETE  ****************************** */

    getLTCSortbyCustomer=async()=>
    {
        let customers=await LGetTableCustomer.getLSortbyCustomer();
        let arraydto=InstanceArrayDTO.instanceArrayTableCustomer(customers);
        return arraydto
    } 
    selectTableCustomer=async(id:number)=>
    {
        let tc=await LGetTableCustomer.getLTableC(id);
        if(tc===null)
        {
        throw new LogicException("The Table Customer does not exists in the system");      
        }
        this.customertableobj=tc;
        return this.customertableobj.getDTO();
    } 
    deleteTableCustomer=async()=>
    {
        this.customertableobj.table.statetable="Available";
    let dto=this.customertableobj.getDTO();
    let deltc=await FactoryData.getDataTableCustomer().deleteTableCustomer(dto);
        if(deltc===true)
        {
            let availablet=await FactoryData.getDataTable().changeState(this.customertableobj.table.getDTO())
            return availablet
        }
    } 
    
}