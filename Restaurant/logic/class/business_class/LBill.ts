import DTOBill from "../../../shared/entity/DTOBill";
import { LogicException } from "../../../shared/exceptions/logicexception";
import LogicOrder from "./LOrder";

export  default class LogicBill
{
   private _idbill: number;
   private _subtotal: number;
   private _totalb: number;
   private _vat: number;
   private _state: string;
   private _lorder: LogicOrder;


    //GETTERS

    public get idbill(): number {
        return this._idbill;
    }
    public get subtotal(): number {
        return this._subtotal;
    }
    public get totalb(): number {
        return this._totalb;
    }
    public get vat(): number {
        return this._vat;
    }
    public get state(): string {
        return this._state;
    }
    public get lorder(): LogicOrder {
        return this._lorder;
    }

    //SETTERS

    public set idbill(value: number) {
        this._idbill = value;
    }
    public set subtotal(value: number) {
        let totalorder=this.lorder.calculateTotal();
        this._subtotal = totalorder;
    }
    public set totalb(value: number) {

        this._totalb = this.subtotal+this.vat;
    }
    public set vat(value: number) {
        let calcvat=value/100;
        let vatsubtotal=this.subtotal*calcvat
        this._vat = vatsubtotal;
    }
    public set state(value: string) {
        if (value.trim()!="Pending" && value.trim()!="Confirmed"&& value.trim()!="Cashed"&&value.trim()!="Canceled")
        {
            throw new LogicException("The state can only be Pending,Confirmed,Canceled and Cashed");
        }

        this._state = value;
    }
    public set lorder(value: LogicOrder) {
        this._lorder = value;
    }
    getDTO=()=>
    {
      let dtobill=new DTOBill(this.idbill,
        this.subtotal,this.totalb,this.vat
        ,this.state,this.lorder.idorder);
       return dtobill
    }
 
   constructor(pidbill:number,psubtotal:number,ptotalb:number,
    pvat:number,pstate:string,plorder:LogicOrder)
   {
      this.lorder=plorder; 
       this.idbill=pidbill;
       this.vat=pvat;
       this.subtotal=psubtotal;
       this.totalb=ptotalb;   
       this.state=pstate;
           
   }
 
}