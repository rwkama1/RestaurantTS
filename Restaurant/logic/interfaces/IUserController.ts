import DTOUser from "../../shared/entity/DTOUser";


export default interface IUserController 
{
    //**************** GETS **************** */

    getUser(idcard:string):Promise<DTOUser>;
    getUsers():Promise<DTOUser[]>;
    getLSortUsers():Promise<DTOUser[]>;
   
    //**************** MAINTENACE **************** */

    registerUser(dtuser:DTOUser):Promise<boolean>;
    updateUser(dtuser:DTOUser):Promise<boolean>;
    deleteUser(dtuser:DTOUser):Promise<boolean>;

     //**************** LOGIN **************** */

    loginUser(idcard:string,password:string):Promise<DTOUser>;
    getloginUser():DTOUser;
    logout():boolean;
    
}