export  default class DTOCustomer
{
   idcard: string;
    name: string;
    town: string;
    lastname: string;
    address: string;
    mail: string;
    phonenumber: string;
    salt: string;
    passwordd: string;
    
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