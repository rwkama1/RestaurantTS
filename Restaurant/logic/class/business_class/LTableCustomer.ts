export  default class LogicTableCustomer
{
    
    private _idtc: number;
    private _idtable: number;
    private _idcardcustomer: string;
  
    //GETTERS

    public get idtc(): number {
        return this._idtc;
    }
    public get idtable(): number {
        return this._idtable;
    }
    public get idcardcustomer(): string {
        return this._idcardcustomer;
    }

    //SETTERS

    public set idtc(value: number) {
        this._idtc = value;
    }
    public set idtable(value: number) {
        this._idtable = value;
    }
    public set idcardcustomer(value: string) {
        this._idcardcustomer = value;
    }
   
   
    // getDTO=()=>
    // {
    //   let dtocategory=new DTOCategory(this.name,this.description);
    //    return dtocategory
    // }


   constructor(pidtc:number,pidtable:number,pidcardcustomer:string)
   {
       this.idtc=pidtc;
       this.idtable=pidtable;  
       this.idcardcustomer=pidcardcustomer;   
   }   
       
}