import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IUserController from "../../interfaces/IUserController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";

import { LUserAutentication } from "./maintenace/LAutentication";
import { LCUUser } from "./maintenace/LCUDUsers";
// import { LUserAutentication } from "./maintenace/LAutentication";
import { LGetUsers } from "./maintenace/LGetUsers";

export class UserController implements IUserController{

    private static instancia: UserController;
    private constructor() { }
    public static getInstance(): UserController {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }

        return UserController.instancia;
    }
    
    //************ CRUD********************** */
    registerUser=async(dtouser:DTOUser)=>
   {
        const result=await LCUUser.registerUser(dtouser);
        return result 
       
   }
    updateUser=async(dtouser:DTOUser)=>
   {
    const result=await LCUUser.updateUser(dtouser);
    return result 

   }
   deleteUser=async(dtouser:DTOUser)=>
   {
    const result=await LCUUser.deleteUser(dtouser);
    return result 

   }

   getUser=async(idcard:string)=>
   {
    const guser=await LGetUsers.getLUser(idcard);
    if(guser===null)
    {
        throw new LogicException("The User does not exists in the system");
        
    }
    return guser.getDTO()
   }
   //***************** GET USERS ***************** */
    getUsers=async()=>
   {
        const gusers=await LGetUsers.getLUsers();
        let arraydto=InstanceArrayDTO.instanceArrayUser(gusers.arrayuser);
        return arraydto
    
   }
   getLSortUsers=async()=>
   {
        const getactiveuser=await LGetUsers.getLSortUsers();
        let arraydto=InstanceArrayDTO.instanceArrayUser(getactiveuser);
        return arraydto
    
   }
   //******************* AUTENTICATION *********************** */

    loginUser=async(idcard:string,password:string)=>
   {  
    const luser=await LUserAutentication.getInstance().loginUser(idcard,password);
    return luser.getDTO()
   }
    getloginUser=()=>
   {
  
    const getloginuser= LUserAutentication.getInstance().userlogin;
    if(getloginuser===null)
    {
        throw new LogicException("There is no user logged in");
        
    }
    return getloginuser.getDTO()
    
   }
    logout=()=>
   {
    const logout= LUserAutentication.getInstance().logout();
    return logout
   }
}