import DTODishC from "../../../shared/entity/DTODishC";
import { LogicException } from "../../../shared/exceptions/logicexception";

export  default class LogicDishC
{
  private _iddishc: number;
  private _characteristic: string;

  //GETTERS

    public get iddishc(): number {
        return this._iddishc;
    }
    public get characteristic(): string {
        
        return this._characteristic;
    }

    //SETTERS

    public set iddishc(value: number) {
        this._iddishc = value;
    }
    public set characteristic(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The characteristic cannot be empty");
        }
        this._characteristic = value;
    }

    getDTO=()=>
    {
        let dtodishc=new DTODishC(this.iddishc,this.characteristic);
        return dtodishc
    }

   constructor(piddishc:number,pcharacteristic:string)
   {
       this.iddishc=piddishc;
       this.characteristic=pcharacteristic;   
   }
      
}