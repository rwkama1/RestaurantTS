"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOUser {
    idcard;
    name;
    city;
    hashh;
    password;
    typeuserr;
    constructor(pidcard, pname, pcity, ptypeuser, phash, ppasswordd) {
        this.idcard = pidcard;
        this.name = pname;
        this.city = pcity;
        this.typeuserr = ptypeuser;
        this.hashh = phash;
        this.password = ppasswordd;
    }
}
exports.default = DTOUser;
//# sourceMappingURL=DTOUser.js.map