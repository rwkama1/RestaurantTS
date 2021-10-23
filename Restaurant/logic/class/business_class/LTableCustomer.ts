import DTOTableCustomer from "../../../shared/entity/DTOTableCustomer";
import LogicCustomer from "./LCustomer";
import LogicTable from "./LTable";


export  default class LogicTableCustomer
{
    
    private _idtc: number;
    private _table: LogicTable;
    private _customer: LogicCustomer;
  
    //GETTERS

    public get idtc(): number {
        return this._idtc;
    }
    public get table(): LogicTable {
        return this._table;
    }
    public get customer(): LogicCustomer {
        return this._customer;
    }

    //SETTERS

    public set idtc(value: number) {
        this._idtc = value;
    }
    public set table(value: LogicTable) {
        this._table = value;
    }
    public set customer(value: LogicCustomer) {
        this._customer = value;
    }
   
   
    getDTO=()=>
    {
      let dtotc=new DTOTableCustomer(this.idtc,this.table.idtable,this.customer.getDTO());
       return dtotc
    }


   constructor(pidtc:number,ptable:LogicTable,pcustomer:LogicCustomer)
   {
       this.idtc=pidtc;
       this.table=ptable;  
       this.customer=pcustomer;   
   }   
       
}