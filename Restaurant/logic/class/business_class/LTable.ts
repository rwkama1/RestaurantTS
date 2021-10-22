import DTOTable from "../../../shared/entity/DTOTable";


export  default class LogicTable
{
    private _idtable: number;
    private _statetable: string;
   
    //GETTERS

    public get idtable(): number {
        return this._idtable;
    }
    public get statetable(): string {
        return this._statetable;
    }

    //SETTERS

    public set idtable(value: number) {
       
        this._idtable = value;
    }
    public set statetable(value: string) {

        this._statetable = value;
    }


    getDTO=()=>
    {
      let dtot=new DTOTable(this.idtable,this.statetable);
      return dtot
    }

    constructor(pidtable:number,pstatet:string)
    {
        this.idtable=pidtable;
        this.statetable=pstatet;     
    }
       
}