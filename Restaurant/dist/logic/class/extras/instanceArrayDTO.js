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
}
exports.InstanceArrayDTO = InstanceArrayDTO;
//# sourceMappingURL=instanceArrayDTO.js.map