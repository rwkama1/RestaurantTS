import { FactoryData } from "../../../../data/FactoryData";
import DTOUser from "../../../../shared/entity/DTOUser";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetUsers } from "./LGetUsers";

export class LCUUser {

    static registerUser=async(dtuser:DTOUser)=>
          {
            let logicuser=InstanceLogicClass.instanceLUser(dtuser);
            let usersearch = await LGetUsers.getLUser(dtuser.idcard);
            if(usersearch!=null)
            {
              throw new LogicException("That User already exists in the system");
              
            }
            let datau=await logicuser.register();
            const reguser=await FactoryData.getDataUser().registerUser(datau);
            return reguser;

          }
    static updateUser=async(dtuser:DTOUser)=>
          {
            let logicuser=InstanceLogicClass.instanceLUser(dtuser);
            let usersearch = await LGetUsers.getLUser(dtuser.idcard);
            if(usersearch===null)
            {
              throw new LogicException("That User does not exists in the system");
              
            }
            let datau=await logicuser.update();
             const upduser=await FactoryData.getDataUser().updateUser(datau);
              return upduser;

          }
      static deleteUser=async(dtuser:DTOUser)=>
          {
            let logicuser=InstanceLogicClass.instanceLUser(dtuser);
            let usersearch = await LGetUsers.getLUser(dtuser.idcard);
            if(usersearch===null)
            {
              throw new LogicException("That User does not exists in the system");
              
            }
            let datau=logicuser.getDTO();
            const deluser=await FactoryData.getDataUser().deleteUser(datau);
            return deluser;

          }
    
  }