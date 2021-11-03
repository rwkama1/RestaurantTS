"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
const LCBill_1 = require("./maintenance/LCBill");
const LGetBill_1 = require("./maintenance/LGetBill");
class BillController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!BillController.instancia) {
            BillController.instancia = new BillController();
        }
        return BillController.instancia;
    }
    // REGISTER 
    listOrdersCustomerB = async (name) => {
        let lbill = await LCBill_1.LCBill.getInstance().listOrdersCustomerB(name);
        return lbill;
    };
    selectOrderB = async (id) => {
        let lbill = await LCBill_1.LCBill.getInstance().selectOrderB(id);
        return lbill;
    };
    calculateTotal = (vat) => {
        let lbill = LCBill_1.LCBill.getInstance().calculateTotal(vat);
        return lbill;
    };
    enterDate = (date) => {
        let lbill = LCBill_1.LCBill.getInstance().enterDate(date);
        return lbill;
    };
    saveBill = async () => {
        let lbill = await LCBill_1.LCBill.getInstance().saveBill();
        return lbill;
    };
    // COLLECT  BILL
    listCustomerBill = async (name) => {
        let lcollectbill = await LCBill_1.LCBill.getInstance().listCustomerBill(name);
        return lcollectbill;
    };
    selectBill = async (id) => {
        let lcollectbill = await LCBill_1.LCBill.getInstance().selectBill(id);
        return lcollectbill;
    };
    collectBill = async (customeramount) => {
        let lcollectbill = await LCBill_1.LCBill.getInstance().collectBill(customeramount);
        return lcollectbill;
    };
    // CANCEL BILL
    cancelBill = async () => {
        let lcollectbill = await LCBill_1.LCBill.getInstance().cancelBill();
        return lcollectbill;
    };
    //************************* GETS ******************** */
    getLBill = async (id) => {
        let lgetbill = await LGetBill_1.LGetBill.getLBill(id);
        return lgetbill.getDTO();
    };
    getLBillbyOrder = async (id) => {
        let lgetbill = await LGetBill_1.LGetBill.getLBillbyOrder(id);
        if (lgetbill === null) {
            throw new logicexception_1.LogicException("No Bill has that Order");
        }
        return lgetbill.getDTO();
    };
    getLBillbyCustomer = async (name) => {
        let lgetbill = await LGetBill_1.LGetBill.getLBillbyCustomer(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayBill(lgetbill);
        return arraydto;
    };
    getLBillbyDates = async (date1, date2) => {
        let lgetbill = await LGetBill_1.LGetBill.getLBillbyDates(date1, date2);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayBill(lgetbill);
        return arraydto;
    };
    getLBills = async () => {
        let lgetbill = await LGetBill_1.LGetBill.getLBills();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayBill(lgetbill.arraybill);
        return arraydto;
    };
}
exports.BillController = BillController;
//# sourceMappingURL=BillController.js.map