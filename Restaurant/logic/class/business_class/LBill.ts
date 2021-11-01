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
        
        this._subtotal = value;
    }
    public set totalb(value: number) {
        this._totalb = value;
    }
    public set vat(value: number) {
        this._vat = value;
    }
    public set state(value: string) {
        this._state = value;
    }
    public set lorder(value: LogicOrder) {
        this._lorder = value;
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