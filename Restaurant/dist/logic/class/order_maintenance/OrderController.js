"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCUDetailOrder_1 = require("./maintenance/LCUDetailOrder");
const LCUOrders_1 = require("./maintenance/LCUOrders");
const LGetOrders_1 = require("./maintenance/LGetOrders");
class OrderController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!OrderController.instancia) {
            OrderController.instancia = new OrderController();
        }
        return OrderController.instancia;
    }
    //***************** REGISTER ***************** */
    //*** ONLINE ************* */
    registerCustomer = async (dtc) => {
        let addc = await LCUOrders_1.LCUOrders.getInstance().registerCustomer(dtc);
        return addc;
    };
    //*** RESTAURANT ********* */
    getCustomerbyExpresionName = async (exp) => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().getCustomerbyExpresionName(exp);
        return addorder;
    };
    enterCustomer = async (id) => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().enterCustomer(id);
        return addorder;
    };
    listDishes = async () => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().listDishes();
        return addorder;
    };
    registerDOrder = async (id, quantity) => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().registerDOrder(id, quantity);
        return addorder;
    };
    removeDOrder = async (id) => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().removeDOrder(id);
        return addorder;
    };
    calculateTotal = () => {
        let addorder = LCUOrders_1.LCUOrders.getInstance().calculateTotal();
        return addorder;
    };
    closeOrder = (date, pspecialr, pnpeople) => {
        let addorder = LCUOrders_1.LCUOrders.getInstance().closeOrder(date, pspecialr, pnpeople);
        return addorder;
    };
    saveOrder = async () => {
        let addorder = await LCUOrders_1.LCUOrders.getInstance().saveOrder();
        return addorder;
    };
    //******************* UPDATE ****************** */
    listOrdersCustomer = async (name) => {
        let updateorder = await LCUOrders_1.LCUOrders.getInstance().listOrdersCustomer(name);
        return updateorder;
    };
    selectOrder = async (id) => {
        let updateorder = await LCUOrders_1.LCUOrders.getInstance().selectOrder(id);
        return updateorder;
    };
    updateCustomer = async (id) => {
        let updateorder = await LCUOrders_1.LCUOrders.getInstance().updateCustomer(id);
        return updateorder;
    };
    updateData = (date, pspecialr, pnpeople) => {
        let updateorder = LCUOrders_1.LCUOrders.getInstance().updateData(date, pspecialr, pnpeople);
        return updateorder;
    };
    updateOrder = async () => {
        let updateorder = await LCUOrders_1.LCUOrders.getInstance().updateOrder();
        return updateorder;
    };
    //****** CHANGE STATE *******/
    updateState = async (state) => {
        let updateorder = await LCUOrders_1.LCUOrders.getInstance().updateState(state);
        return updateorder;
    };
    //***********************************  DETAIL ORDER ***************************************** */
    //***************** REGISTER ************* */
    listOrdersCustomerDO = async (name) => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().listOrdersCustomerDO(name);
        return detailorder;
    };
    selectOrderDO = async (id) => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().selectOrderDO(id);
        return detailorder;
    };
    registerDOrderDO = async (id, quantity) => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().registerDOrderDO(id, quantity);
        return detailorder;
    };
    calculateTotalDO = () => {
        let detailorder = LCUDetailOrder_1.LCUDetailOrder.getInstance().calculateTotalDO();
        return detailorder;
    };
    saveDOrderDO = async () => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().saveDOrderDO();
        return detailorder;
    };
    //**************** UPDATE ******************** */
    updateDetailOrderDO = async (iddetailo, iddish, quantity) => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().updateDetailOrderDO(iddetailo, iddish, quantity);
        return detailorder;
    };
    //***************** DELETE ALL **************** */
    deleteAllDO = async () => {
        let detailorder = await LCUDetailOrder_1.LCUDetailOrder.getInstance().deleteAllDO();
        return detailorder;
    };
    //*************************************** GETS *************************************************** */
    getLOrder = async (id) => {
        let lorder = await LGetOrders_1.LGetOrders.getLOrder(id);
        if (lorder === null) {
            throw new logicexception_1.LogicException("The Order does not exists in the system");
        }
        return lorder.getDTO();
    };
    searchbyCustomer = async (id) => {
        let lorder = await LGetOrders_1.LGetOrders.searchbyCustomer(id);
        if (lorder === null) {
            throw new logicexception_1.LogicException("The Customer have not Orders");
        }
        return lorder.getDTO();
    };
    searchbyCustomerExp = async (exp) => {
        let lorders = await LGetOrders_1.LGetOrders.searchbyCustomerExp(exp);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    getLOrders = async () => {
        let lorders = await LGetOrders_1.LGetOrders.getLOrders();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders.arrayorder);
        return arraydto;
    };
    sortbyCustomerName = async () => {
        let lorders = await LGetOrders_1.LGetOrders.sortbyCustomerName();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    sortbyNumberPeople = async () => {
        let lorders = await LGetOrders_1.LGetOrders.sortbyNumberPeople();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    getPendingOrders = async () => {
        let lorders = await LGetOrders_1.LGetOrders.getPendingOrders();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    getConfirmedOrders = async () => {
        let lorders = await LGetOrders_1.LGetOrders.getConfirmedOrders();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    getCashedOrders = async () => {
        let lorders = await LGetOrders_1.LGetOrders.getCashedOrders();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    getCanceledOrders = async () => {
        let lorders = await LGetOrders_1.LGetOrders.getCanceledOrders();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map