import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import HashPassword from "../encrypt/hashPassword";



export  default class LogicUser
{
   private _idcard: string;
   private _name: string;
   private _hashh: string;
   private _city: string;
   private _password: string;
   private _typeuserr: string;

   //GETTERS
    public get idcard(): string {
        return this._idcard;
    }
    public get name(): string {
        return this._name;
    }
    public get hashh(): string {
        return this._hashh;
    }
    public get city(): string {
        return this._city;
    }
    public get password(): string {
        return this._password;
    }
    public get typeuserr(): string {
        return this._typeuserr;
    }
    //SETTERS
    public set idcard(value: string) {
        var numbers = /^[0-9]+$/;
        if (!value.trim().match(numbers)) {
              throw new LogicException("The identity card must have only numbers");
                }
        if (value.trim() === "") {
              throw new LogicException("The identity card cannot be empty");
               }
         this._idcard = value;  
     }
    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    public set hashh(value: string) {
        this._hashh = value;
    }
    public set password(value: string) {
       
        this._password = value;
    }
    public set city(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The city cannot be empty");
        }
        this._city = value;
    }
    public set typeuserr(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The typeuser cannot be empty");
        }
      if (value.trim()!="Administrator" && value.trim()!="Waiter"&& value.trim()!="Chef"&& value.trim()!="Cashier")
        {
            throw new LogicException("The user can only be of the type Administrator,Waiter,Chef and Cashier");
        }
        this._typeuserr = value;
    }
    //******************************************************* */
  
    private validatePassword=()=>
    {
         let pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
         if (!this.password.match(pass))       
         {
          throw new LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
         } 
    }
    //******************************************************* */
      register=async()=>
       {

       this.validatePassword();
       const passh=await HashPassword.hashPassword(this.password);
       this.password=passh.hash;
       this.hashh=passh.salt;
       return this.getDTO()
       
      }
       
      update=async()=>
      {
        this.validatePassword();
        const passh=await HashPassword.hashPassword(this.password);
        this.password=passh.hash;
        this.hashh=passh.salt;
        return this.getDTO()
        
      }
      
      getDTO=()=>
       {
         let dtouser=new DTOUser(this.idcard,this.name,this.city,this.typeuserr,this.hashh,this.password);
          return dtouser
       }
       constructor(pidcard:string,pname:string,pcity:string,
        ptypeuser:string ,phash:string ,ppasswordd:string )
        {
            this.idcard=pidcard;
            this.name=pname;
            this.city=pcity;
            this.typeuserr=ptypeuser;
            this.hashh=phash;
            this.password=ppasswordd;
        
     
        }
      
}