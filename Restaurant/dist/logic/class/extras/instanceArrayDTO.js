"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceArrayDTO = void 0;
class InstanceArrayDTO {
    static instanceArrayUser = (larrayuser) => {
        let arraydto = [];
        for (let user of larrayuser) {
            let dtouser = user.getDTO();
            arraydto.push(dtouser);
        }
        return arraydto;
    };
    static instanceArrayCustomer = (larrayc) => {
        let arraydto = [];
        for (let c of larrayc) {
            let dtc = c.getDTO();
            arraydto.push(dtc);
        }
        return arraydto;
    };
    static instanceArrayCategory = (larrayc) => {
        let arraydto = [];
        for (let cat of larrayc) {
            let dtcat = cat.getDTO();
            arraydto.push(dtcat);
        }
        return arraydto;
    };
    static instanceArrayDish = (larrayd) => {
        let arraydto = [];
        for (let ldish of larrayd) {
            let dtdish = ldish.getDTO();
            arraydto.push(dtdish);
        }
        return arraydto;
    };
    static instanceArrayTable = (larrayt) => {
        let arraydto = [];
        for (let ltable of larrayt) {
            let dtotable = ltable.getDTO();
            arraydto.push(dtotable);
        }
        return arraydto;
    };
    static instanceArrayTableCustomer = (larraytc) => {
        let arraydto = [];
        for (let ltabletc of larraytc) {
            let dtotc = ltabletc.getDTO();
            arraydto.push(dtotc);
        }
        return arraydto;
    };
    static instanceArrayOrder = (larrayo) => {
        let arraydto = [];
        for (let lorder of larrayo) {
            let dto = lorder.getDTO();
            arraydto.push(dto);
        }
        return arraydto;
    };
}
exports.InstanceArrayDTO = InstanceArrayDTO;
//# sourceMappingURL=instanceArrayDTO.js.map