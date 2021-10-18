"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceLogicClass = void 0;
const LCategory_1 = require("../business_class/LCategory");
const LCustomer_1 = require("../business_class/LCustomer");
const LUser_1 = require("../business_class/LUser");
class InstanceLogicClass {
    static instanceLUser = (dtouser) => {
        var logicuser = new LUser_1.default(dtouser.idcard, dtouser.name, dtouser.city, dtouser.typeuserr, dtouser.hashh, dtouser.password);
        return logicuser;
    };
    static instanceLCustomer = (dtc) => {
        var logicustomer = new LCustomer_1.default(dtc.idcard, dtc.name, dtc.lastname, dtc.town, dtc.address, dtc.phonenumber, dtc.mail, dtc.salt, dtc.passwordd);
        return logicustomer;
    };
    static instanceLCategory = (dtocat) => {
        let logiccat = new LCategory_1.default(dtocat.name, dtocat.description);
        return logiccat;
    };
}
exports.InstanceLogicClass = InstanceLogicClass;
//# sourceMappingURL=instanceBusinessClass.js.map