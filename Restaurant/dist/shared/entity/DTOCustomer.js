"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOCustomer {
    idcard;
    name;
    town;
    lastname;
    address;
    mail;
    phonenumber;
    salt;
    passwordd;
    constructor(pidcard, pname, plastname, ptown, paddress, pphonenumber, pmail, psalt, ppasswordd) {
        this.idcard = pidcard;
        this.name = pname;
        this.lastname = plastname;
        this.town = ptown;
        this.address = paddress;
        this.phonenumber = pphonenumber;
        this.mail = pmail;
        this.salt = psalt;
        this.passwordd = ppasswordd;
    }
}
exports.default = DTOCustomer;
//# sourceMappingURL=DTOCustomer.js.map