"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUOrders = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const DTOOrder_1 = require("../../../../shared/entity/DTOOrder");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LCUCustomer_1 = require("../../customer_maintenance/maintenance/LCUCustomer");
const LGetsCustomer_1 = require("../../customer_maintenance/maintenance/LGetsCustomer");
const LGetDish_1 = require("../../dish_maintenance/maintenance/LGetDish");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetOrders_1 = require("./LGetOrders");
class LCUOrders {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCUOrders.instancia) {
            LCUOrders.instancia = new LCUOrders();
        }
        return LCUOrders.instancia;
    }
    _orderobj;
    get orderobj() {
        return this._orderobj;
    }
    set orderobj(value) {
        this._orderobj = value;
    }
    //************************************ REGISTER *************************** */
    //*** ONLINE ************* */
    registerCustomer = async (dtc) => {
        let addc = await LCUCustomer_1.LCUCustomer.getInstance().registerCustomer(dtc);
        return addc;
    };
    //*** RESTAURANT ********* */
    getCustomerbyExpresionName = async (exp) => {
        let customers = await LGetsCustomer_1.LGetCustomer.getCustomerbyExpresion(exp);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayCustomer(customers);
        return arraydto;
    };
    enterCustomer = async (id) => {
        let dtorder = new DTOOrder_1.default(0, new Date(), "Pending", "ASD", 2, id, []);
        let lorder = await instanceBusinessClass_1.InstanceLogicClass.instanceLOrder(dtorder);
        this.orderobj = lorder;
        return this.orderobj.customer.getDTO();
    };
    listDishes = async () => {
        let dishes = await LGetDish_1.LGetDish.getLDishesWithoutI();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayDish(dishes.arraydish);
        return arraydto;
    };
    registerDOrder = async (id, quantity) => {
        if (this.orderobj != null) {
            let datadetailo = await this.orderobj.registerDetailOrder(id, quantity);
            return datadetailo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    removeDOrder = async (id) => {
        if (this.orderobj != null) {
            let datadetailo = this.orderobj.removeDetailOrder(id);
            return datadetailo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    calculateTotal = () => {
        if (this.orderobj != null) {
            let total = this.orderobj.calculateTotal();
            return total;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    closeOrder = (date, pspecialr, pnpeople) => {
        if (this.orderobj != null) {
            let datao = this.orderobj.register(date, pspecialr, pnpeople);
            return datao;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    saveOrder = async () => {
        if (this.orderobj != null) {
            let gerorders = await LGetOrders_1.LGetOrders.getLOrders();
            this.orderobj.idorder = gerorders.arrayorder.length + 1;
            let datao = this.orderobj.getDTO();
            let addo = FactoryData_1.FactoryData.getDataOrder().registerOrder(datao);
            return addo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    //************************************* UPDATE ************************** */
    listOrdersCustomer = async (name) => {
        let lorders = await LGetOrders_1.LGetOrders.searchbyCustomerExp(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    selectOrder = async (id) => {
        let lorder = await LGetOrders_1.LGetOrders.getLOrder(id);
        if (lorder === null) {
            throw new logicexception_1.LogicException("The Order does not exists in the system");
        }
        this.orderobj = lorder;
        return this.orderobj.getDTO();
    };
    updateCustomer = async (id) => {
        if (this.orderobj != null) {
            let customer = await LGetsCustomer_1.LGetCustomer.getLCustomer(id);
            this.orderobj.customer = customer;
            return this.orderobj.getDTO();
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    updateData = (date, pspecialr, pnpeople) => {
        if (this.orderobj != null) {
            let datao = this.orderobj.register(date, pspecialr, pnpeople);
            return datao;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    updateOrder = async () => {
        if (this.orderobj != null) {
            let datao = this.orderobj.getDTO();
            let addo = await FactoryData_1.FactoryData.getDataOrder().updateOrder(datao);
            return addo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
    //****** CHANGE STATE *******/
    updateState = async (state) => {
        if (this.orderobj != null) {
            this.orderobj.stateorder = state;
            let datao = this.orderobj.getDTO();
            let addo = await FactoryData_1.FactoryData.getDataOrder().updateOrder(datao);
            return addo;
        }
        else {
            throw new logicexception_1.LogicException("The Order is null");
        }
    };
}
exports.LCUOrders = LCUOrders;
//# sourceMappingURL=LCUOrders.js.map