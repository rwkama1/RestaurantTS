"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUUser = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetUsers_1 = require("./LGetUsers");
class LCUUser {
    static registerUser = async (dtuser) => {
        let logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtuser);
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(dtuser.idcard);
        if (usersearch != null) {
            throw new logicexception_1.LogicException("That User already exists in the system");
        }
        let datau = await logicuser.register();
        const reguser = await FactoryData_1.FactoryData.getDataUser().registerUser(datau);
        return reguser;
    };
    static updateUser = async (dtuser) => {
        let logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtuser);
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(dtuser.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User does not exists in the system");
        }
        let datau = await logicuser.update();
        const upduser = await FactoryData_1.FactoryData.getDataUser().updateUser(datau);
        return upduser;
    };
    static deleteUser = async (dtuser) => {
        let logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtuser);
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(dtuser.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User does not exists in the system");
        }
        let datau = logicuser.getDTO();
        const deluser = await FactoryData_1.FactoryData.getDataUser().deleteUser(datau);
        return deluser;
    };
}
exports.LCUUser = LCUUser;
//# sourceMappingURL=LCUDUsers.js.map