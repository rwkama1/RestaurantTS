"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LAutentication_1 = require("./maintenace/LAutentication");
const LCUDUsers_1 = require("./maintenace/LCUDUsers");
// import { LUserAutentication } from "./maintenace/LAutentication";
const LGetUsers_1 = require("./maintenace/LGetUsers");
class UserController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }
        return UserController.instancia;
    }
    //************ CRUD********************** */
    registerUser = async (dtouser) => {
        const result = await LCUDUsers_1.LCUUser.registerUser(dtouser);
        return result;
    };
    updateUser = async (dtouser) => {
        const result = await LCUDUsers_1.LCUUser.updateUser(dtouser);
        return result;
    };
    deleteUser = async (dtouser) => {
        const result = await LCUDUsers_1.LCUUser.deleteUser(dtouser);
        return result;
    };
    getUser = async (idcard) => {
        const guser = await LGetUsers_1.LGetUsers.getLUser(idcard);
        if (guser === null) {
            throw new logicexception_1.LogicException("The User does not exists in the system");
        }
        return guser.getDTO();
    };
    //***************** GET USERS ***************** */
    getUsers = async () => {
        const gusers = await LGetUsers_1.LGetUsers.getLUsers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayUser(gusers.arrayuser);
        return arraydto;
    };
    getLSortUsers = async () => {
        const getactiveuser = await LGetUsers_1.LGetUsers.getLSortUsers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayUser(getactiveuser);
        return arraydto;
    };
    //******************* AUTENTICATION *********************** */
    loginUser = async (idcard, password) => {
        const luser = await LAutentication_1.LUserAutentication.getInstance().loginUser(idcard, password);
        return luser.getDTO();
    };
    getloginUser = () => {
        const getloginuser = LAutentication_1.LUserAutentication.getInstance().userlogin;
        if (getloginuser === null) {
            throw new logicexception_1.LogicException("There is no user logged in");
        }
        return getloginuser.getDTO();
    };
    logout = () => {
        const logout = LAutentication_1.LUserAutentication.getInstance().logout();
        return logout;
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map