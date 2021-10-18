import DTOCategory from "../../../shared/entity/DTOCategory";
import { LogicException } from "../../../shared/exceptions/logicexception";

export  default class LogicCategory
{
    private _name: string;
    private _description: string;
   
     //GETTERS

    public get name(): string {
        return this._name;
    }
    public get description(): string {
        return this._description;
    }

    //SETTERS

    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    public set description(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The description cannot be empty");
        }
        this._description = value;
    }
    register=async()=>
    { 
         return this.getDTO()
    }
  
    update=async(description:string)=>
    {
         this.description=description;
         return this.getDTO()
    }
    getDTO=()=>
    {
      let dtocategory=new DTOCategory(this.name,this.description);
       return dtocategory
    }

    constructor(pname:string,pdescription:string)
    {
        this.name=pname;
        this.description=pdescription;     
    }
       
}