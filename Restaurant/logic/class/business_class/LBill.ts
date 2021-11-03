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
private _date: Date;
   

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
    public get date(): Date {
        return this._date;
    }
    //SETTERS

    public set idbill(value: number) {
        this._idbill = value;
    }
    public set subtotal(value: number) {
        
        this._subtotal = value;
    }
    public set totalb(value: number) {

        this._totalb = value;
    }
    public set vat(value: number) {
       
        this._vat = value;
    }
    public set state(value: string) {
        if (value.trim()!="Pending" &&  value.trim()!="Cashed"&&value.trim()!="Canceled")
        {
            throw new LogicException("The state can only be Pending,Canceled and Cashed");
        }

        this._state = value;
    }
    public set lorder(value: LogicOrder) {
        this._lorder = value;
    } 
    public set date(value: Date) {
        this._date = value;
    }

    
    getDTO=()=>
    {
      let dtobill=new DTOBill(this.idbill,
        this.subtotal,this.totalb,this.vat
        ,this.state,this.lorder.idorder,this.date);
       return dtobill
    }
    
    calculateTotal=()=>
    {
        let totalorder=this.lorder.calculateTotal();
        this.subtotal=totalorder;
        let calcvat=this.vat/100;
        let vatsubtotal=this.subtotal*calcvat;
        this.totalb=vatsubtotal+this.subtotal;
        return this.totalb
    }
 
   constructor(pidbill:number,psubtotal:number,ptotalb:number,
    pvat:number,pstate:string,plorder:LogicOrder,pdate:Date)
   {
      this.lorder=plorder; 
       this.idbill=pidbill;
       this.vat=pvat;
       this.subtotal=psubtotal;
       this.totalb=ptotalb;   
       this.state=pstate;
       this.date=pdate;  
   }
 
}