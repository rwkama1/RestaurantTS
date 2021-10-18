export  default class DTOUser
{
   idcard: string;
   name: string;
   city: string;
   hashh: string;
   password: string;
   typeuserr: string;


   
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