import DTODishC from "../../../shared/entity/DTODishC";
import { LogicException } from "../../../shared/exceptions/logicexception";

export  default class LogicDishC
{
  private _iddishc: number;
  private _name: string;
  private _cost: number;
   private _quantity: number;
   

  //GETTERS

    public get iddishc(): number {
        return this._iddishc;
    }
    public get name(): string {
        
        return this._name;
    }
     public get quantity(): number {
        return this._quantity;
    }
    public get cost(): number {
        return this._cost;
    }
    //SETTERS

    public set iddishc(value: number) {
        this._iddishc = value;
    }
    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    public set cost(value: number) {
        if (value<1)
        {
         throw new LogicException("The cost must be greater than 0");
        }
        this._cost = value;
    }
    public set quantity(value: number) {
        if (value<1)
        {
         throw new LogicException("The quantity must be greater than 0");
        }
        this._quantity = value;
    }
    update=(dtodishi:DTODishC)=>
    {
        this.name=dtodishi.namei;
        this.cost=dtodishi.costi;
        this.quantity=dtodishi.quantity;
    }
    calculateAmount=()=>
    {
        let amount=this.cost*this.quantity;
        return amount
    }
    getDTO=()=>
    {
        let dtodishc=new DTODishC(this.iddishc,this.name,this.cost,this.quantity);
        return dtodishc
    }
    
   constructor(piddishc:number,pname:string,pcost:number,pquantity:number)
   {
       this.iddishc=piddishc;
       this.name=pname;  
       this.cost=pcost;
       this.quantity=pquantity;   
   }
      
}