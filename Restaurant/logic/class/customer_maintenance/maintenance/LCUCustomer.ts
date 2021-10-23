import { FactoryData } from "../../../../data/FactoryData";
import DTOCustomer from "../../../../shared/entity/DTOCustomer";


import { InstanceLogicClass } from "../../extras/instanceBusinessClass";


export class LCUCustomer {

  private static instancia: LCUCustomer;
  private constructor() { }
  public static getInstance(): LCUCustomer {
      if (!LCUCustomer.instancia) {
        LCUCustomer.instancia = new LCUCustomer();
      }

      return LCUCustomer.instancia;
  }
  
  registerCustomer=async(dtc:DTOCustomer)=>
       {
          let logicc=InstanceLogicClass.instanceLCustomer(dtc);
          let datac=await logicc.getDTO();
          const regc=await FactoryData.getDataCustomer().registerCustomer(datac);
          return regc;
       }
  
   
    
  }