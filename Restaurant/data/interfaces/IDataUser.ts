import DTOUser from "../../shared/entity/DTOUser";

export default interface IDataUsers 
{
    getUsers():Promise<DTOUser[]>; 
    registerUser(dtuser:DTOUser):Promise<boolean>;
    updateUser(dtuser:DTOUser):Promise<boolean>;
    deleteUser(dtuser:DTOUser):Promise<boolean>;
}