import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";


export  default class LogicCustomer
{
   private _id: number;
   private _name: string;
   private _lastname: string;
   
    
   //GETTERS 
   
    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get lastname(): string {
        return this._lastname;
    }
  

    //SETTERS

    public set id(value: number) {
        this._id = value;
    }
    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }   
    public set lastname(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The lastname cannot be empty");
        }
        this._lastname = value;
    }
   
 
   
   getDTO=()=>
   {
     let dtocustomer=new DTOCustomer(this.id,this.name,this.lastname);
      return dtocustomer
   }
   constructor(pid:number,pname:string,plastname:string)
   {
       this.id=pid;
       this.name=pname;
       this.lastname=plastname;
   }
      
}