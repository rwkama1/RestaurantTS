import DTODeatilOrder from "../../../shared/entity/DTODetailOrder";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LGetDish } from "../dish_maintenance/maintenance/LGetDish";
import LogicDish from "./LDish";

export  default class LogicDetailOrder
{
   
    private _iddetailorder: number;
    private _quantitydo: number;
    private _amountdo: number;
    private _dish: LogicDish;

    //GETTERS

    public get iddetailorder(): number {
        return this._iddetailorder;
    }
    public get quantitydo(): number {
        return this._quantitydo;
    }
    public get amountdo(): number {
        return this._amountdo;
    }
    public get dish(): LogicDish {
        return this._dish;
    }
 
    //SETTERS

    public set iddetailorder(value: number) {
        this._iddetailorder = value;
    }
    public set quantitydo(value: number) {
        if(value<1)
        {
            throw new LogicException("The Quantity must be grater than 0");
            
        }
        this._quantitydo = value;
    }
    
    public set dish(value: LogicDish) {

        if(value===null)
        {
            throw new LogicException("The Dish does not exists in the system");
            
        }
        this._dish = value;
    }
    public set amountdo(value: number) {
        if(value<1)
        {
            throw new LogicException("The Amount must be grater than 0");
            
        }
        let amount=this.quantitydo*this.dish.price;
        this._amountdo = amount;
    }
    
    update=async(iddish:number,quantity:number)=> {
        
        let ldish=await LGetDish.getLDishWithoutI(iddish);
        this.dish=ldish;
        this.quantitydo=quantity;
    }
    getDTO=()=>
    {
        let dto=new DTODeatilOrder(this.iddetailorder,this.quantitydo,this.amountdo,this.dish.iddish);
        return dto
    }

    constructor(piddetailorder:number,pquantitydo:number,pamountdo:number,
        pdish:LogicDish)
       {
           this.iddetailorder=piddetailorder;
           this.dish=pdish; 
           this.quantitydo=pquantitydo; 
           this.amountdo=pamountdo;
        
         
       }
      
}