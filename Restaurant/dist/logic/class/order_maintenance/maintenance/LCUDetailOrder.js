"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDetailOrder = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const LGetOrders_1 = require("./LGetOrders");
class LCUDetailOrder {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUDetailOrder.instancia) {
            LCUDetailOrder.instancia = new LCUDetailOrder();
        }
        return LCUDetailOrder.instancia;
    }
    _orderobj;
    get orderobj() {
        return this._orderobj;
    }
    set orderobj(value) {
        this._orderobj = value;
    }
    //**************************** REGISTER ************* */
    listOrdersCustomerDO = async (name) => {
        let lorders = await LGetOrders_1.LGetOrders.searchbyCustomerExp(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    selectOrderDO = async (id) => {
        let lorder = await LGetOrders_1.LGetOrders.getLOrder(id);
        if (lorder === null) {
            throw new logicexception_1.LogicException("The Order does not exists in the system");
        }
        this.orderobj = lorder;
        return this.orderobj.getDTO();
    };
    registerDOrderDO = async (id, quantity) => {
        if (this.orderobj != null) {
            let datadetailo = await this.orderobj.registerDetailOrder(id, quantity);
            return datadetailo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    calculateTotalDO = () => {
        if (this.orderobj != null) {
            let total = this.orderobj.calculateTotal();
            return total;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    saveDOrderDO = async () => {
        if (this.orderobj != null) {
            let dtoorder = this.orderobj.getDTO();
            let adddo = await FactoryData_1.FactoryData.getDataOrder().registerDetailOrder(dtoorder);
            return adddo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    //***************************** UPDATE ******************** */
    updateDetailOrderDO = async (iddetailo, iddish, quantity) => {
        if (this.orderobj != null) {
            let dtoorder = this.orderobj.updateDetailOrder(iddetailo, iddish, quantity);
            let adddo = await FactoryData_1.FactoryData.getDataOrder().updateOrder(this.orderobj.getDTO());
            return adddo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    //***************************** DELETE ALL **********************/
    deleteAllDO = async () => {
        if (this.orderobj != null) {
            let dtoorder = this.orderobj.getDTO();
            let adddo = await FactoryData_1.FactoryData.getDataOrder().deleteDetailOrder(dtoorder);
            return adddo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
}
exports.LCUDetailOrder = LCUDetailOrder;
//# sourceMappingURL=LCUDetailOrder.js.map