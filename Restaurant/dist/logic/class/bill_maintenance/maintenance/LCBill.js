"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCBill = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LBill_1 = require("../../business_class/LBill");
const instanceArrayDTO_1 = require("../../extras/instanceArrayDTO");
const LGetOrders_1 = require("../../order_maintenance/maintenance/LGetOrders");
const LGetBill_1 = require("./LGetBill");
class LCBill {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LCBill.instancia) {
            LCBill.instancia = new LCBill();
        }
        return LCBill.instancia;
    }
    _billobj;
    get billobj() {
        return this._billobj;
    }
    set billobj(value) {
        this._billobj = value;
    }
    // REGISTER 
    listOrdersCustomerB = async (name) => {
        let lorders = await LGetOrders_1.LGetOrders.searchbyCustomerExp(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayOrder(lorders);
        return arraydto;
    };
    selectOrderB = async (id) => {
        let lorder = await LGetOrders_1.LGetOrders.getLOrder(id);
        if (lorder === null) {
            throw new logicexception_1.LogicException("The Order does not exists in the system");
        }
        let newobj = new LBill_1.default(0, 0, 0, 0, "Pending", lorder, new Date());
        this.billobj = newobj;
        return this.billobj.lorder.getDTO();
    };
    enterVATPercentage = (vat) => {
        if (this.billobj != null) {
            this.billobj.vat = vat;
            let vatsubtotal = this.billobj.calculateSubtotalVAT();
            return vatsubtotal;
        }
        else {
            throw new logicexception_1.LogicException("The Bill is null");
        }
    };
    enterDate = (date) => {
        if (this.billobj != null) {
            this.billobj.date = date;
            return this.billobj.getDTO();
        }
        else {
            throw new logicexception_1.LogicException("The Bill is null");
        }
    };
    saveBill = async () => {
        if (this.billobj != null) {
            let dtobill = this.billobj.getDTO();
            let addb = await FactoryData_1.FactoryData.getDataBill().registerBill(dtobill);
            if (addb) {
                return dtobill;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Bill is null");
        }
    };
    // COLLECT  BILL
    listCustomerBill = async (name) => {
        let lbills = await LGetBill_1.LGetBill.getLBillbyCustomer(name);
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayBill(lbills);
        return arraydto;
    };
    selectBill = async (id) => {
        let lbill = await LGetBill_1.LGetBill.getLBill(id);
        if (lbill === null) {
            throw new logicexception_1.LogicException("The Bill does not exists in the system");
        }
        this.billobj = lbill;
        return this.billobj.getDTO();
    };
    collectBill = async (customeramount) => {
        if (this.billobj != null) {
            if (customeramount > this.billobj.totalb) {
                this.billobj.state = "Cashed";
                let dtobill = this.billobj.getDTO();
                let addb = await FactoryData_1.FactoryData.getDataBill().updateState(dtobill);
                if (addb) {
                    return dtobill;
                }
            }
            else {
                throw new logicexception_1.LogicException("The Customer Amount must be greather than the Total");
            }
        }
        else {
            throw new logicexception_1.LogicException("The Bill is null");
        }
    };
    // CANCEL BILL
    cancelBill = async () => {
        if (this.billobj != null) {
            this.billobj.state = "Cancel";
            let dtobill = this.billobj.getDTO();
            let addb = await FactoryData_1.FactoryData.getDataBill().updateState(dtobill);
            if (addb) {
                return dtobill;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Bill is null");
        }
    };
}
exports.LCBill = LCBill;
//# sourceMappingURL=LCBill.js.map