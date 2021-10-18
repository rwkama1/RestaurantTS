import DTOCustomer from "../../../shared/entity/DTOCustomer";
import { LogicException } from "../../../shared/exceptions/logicexception";
import HashPassword from "../encrypt/hashPassword";

export  default class LogicCustomer
{
   private _idcard: string;
   private _name: string;
   private _town: string;
   private _lastname: string;
   private _address: string;
   private _mail: string;
   private _phonenumber: string;
   private _salt: string;
   private _passwordd: string;
    
   //GETTERS 
   
    public get idcard(): string {
        return this._idcard;
    }
    public get name(): string {
        return this._name;
    }
    public get town(): string {
        return this._town;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public get address(): string {
        return this._address;
    }
    public get mail(): string {
        return this._mail;
    }
    public get phonenumber(): string {
        return this._phonenumber;
    }
    public get salt(): string {
        return this._salt;
    }
    public get passwordd(): string {
        return this._passwordd;
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
    public set town(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The town cannot be empty");
        }
        this._town = value;
    } 
    public set lastname(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The lastname cannot be empty");
        }
        this._lastname = value;
    }
    public set address(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The address cannot be empty");
        }
        this._address = value;
    }
    public set mail(value: string) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat))
         {
         throw new LogicException("The email is not valid");
         }
        this._mail = value;
    }
    public set phonenumber(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The address cannot be empty");
        }
        this._phonenumber = value;
    }
    public set salt(value: string) {
        this._salt = value;
    }
    public set passwordd(value: string) {
        this._passwordd = value;
    }

    private validatePassword=()=>
    {
         let pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
         if (!this.passwordd.match(pass))       
         {
          throw new LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
         } 
    }
    register=async()=>
    {
        this.validatePassword();
        const passh=await HashPassword.hashPassword(this.passwordd);
        this.passwordd=passh.hash;
        this.salt=passh.salt;
        return this.getDTO()   
   }
   update=async(dtc:DTOCustomer)=>
   {
        this.passwordd=dtc.passwordd;
        this.validatePassword();
        this.name=dtc.name;
        this.town=dtc.town;
        this.lastname=dtc.lastname;
        this.address=dtc.address;
        this.mail=dtc.mail;
        this.phonenumber=dtc.phonenumber;
        const passh=await HashPassword.hashPassword(dtc.passwordd);
        this.passwordd=passh.hash;
        this.salt=passh.salt;
        return this.getDTO()
   }
   getDTO=()=>
   {
     let dtocustomer=new DTOCustomer(this.idcard,this.name,this.lastname,this.town,this.address,this.phonenumber
        ,this.mail,this.salt,this.passwordd);
      return dtocustomer
   }
   constructor(pidcard:string,pname:string,plastname:string,
   ptown:string, paddress:string,pphonenumber:string,pmail:string,psalt:string
   ,ppasswordd:string )
   {
       this.idcard=pidcard;
       this.name=pname;
       this.lastname=plastname;
       this.town=ptown;
       this.address=paddress;
       this.phonenumber=pphonenumber;
       this.mail=pmail;
       this.salt=psalt;
       this.passwordd=ppasswordd;
   }
      
}