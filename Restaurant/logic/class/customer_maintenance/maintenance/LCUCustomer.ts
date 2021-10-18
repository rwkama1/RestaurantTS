import { FactoryData } from "../../../../data/FactoryData";
import DTOCustomer from "../../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicCustomer from "../../business_class/LCustomer";
import { InstanceArrayDTO } from "../../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetCustomer } from "./LGetsCustomer";

export class LCUCustomer {

  private static instancia: LCUCustomer;
  private constructor() { }
  public static getInstance(): LCUCustomer {
      if (!LCUCustomer.instancia) {
        LCUCustomer.instancia = new LCUCustomer();
      }

      return LCUCustomer.instancia;
  }
  
  private _customerobj: LogicCustomer;
  public get customerobj(): LogicCustomer {
      return this._customerobj;
  }
  public set customerobj(value: LogicCustomer) {
      this._customerobj = value;
  }
  listCustomers=async()=>
  {
      let customers= await LGetCustomer.getLSortCustomers();
      let arraydto=InstanceArrayDTO.instanceArrayCustomer(customers);
      return arraydto
  }
  getCustomersbyName=async(name:string,lastname:string)=>
  {
    let customer= await LGetCustomer.getLCustomerbyName(name,lastname);
    return customer.getDTO()
      
  }
  selectCustomer=async(idcard:string)=>
  {
    let customer= await LGetCustomer.getLCustomer(idcard);
    if(customer===null)
    {
      throw new LogicException("The Customer does not exists in the system");
    }
    this.customerobj=customer;
    return this.customerobj.getDTO()
      
  }
  updateCustomer=async(dtc:DTOCustomer)=>
       {
        if(this.customerobj!=null)
         {
          let datadtc=await this.customerobj.update(dtc);
          const updc=await FactoryData.getDataCustomer().updateCustomer(datadtc);
          return updc;
         }
         else
         {
           throw new LogicException("The Customer does not exists in the system");
           
         }

       }
     
  //***************************************************** */

   registerCustomer=async(dtc:DTOCustomer)=>
       {
            let logicc=InstanceLogicClass.instanceLCustomer(dtc);
            let custs = await LGetCustomer.getLCustomer(dtc.idcard);
            if(custs!=null)
            {
              throw new LogicException("That Customer already exists in the system");
              
            }
            let datac=await logicc.register();
            const regc=await FactoryData.getDataCustomer().registerCustomer(datac);
            return regc;

       }
  
   
    
  }