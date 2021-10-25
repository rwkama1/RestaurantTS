"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOOrder {
    idorder;
    dateorder;
    stateorder;
    specialrequirements;
    numberpeople;
    idcustomer;
    detailorders;
    constructor(pidorder, pdateorder, pstateorder, pspecialrqueriments, pnumberpeople, pidcustomer, pdetailorders) {
        this.idorder = pidorder;
        this.dateorder = pdateorder;
        this.stateorder = pstateorder;
        this.specialrequirements = pspecialrqueriments;
        this.numberpeople = pnumberpeople;
        this.idcustomer = pidcustomer;
        this.detailorders = pdetailorders;
    }
}
exports.default = DTOOrder;
//# sourceMappingURL=DTOOrder.js.map