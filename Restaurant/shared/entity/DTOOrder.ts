import DTODeatilOrder from "./DTODetailOrder";

export  default class DTOOrder
{
    idorder: number;
    dateorder: Date;
    stateorder: string;
    specialrequirements: string;
    numberpeople: number;
    idcustomer: number;
    detailorders: DTODeatilOrder[];
    
 
   constructor(pidorder:number,pdateorder:Date,pstateorder:string,
    pspecialrqueriments:string,pnumberpeople:number,pidcustomer:number,
    pdetailorders:DTODeatilOrder[])
   {
       this.idorder=pidorder;
       this.dateorder=pdateorder; 
       this.stateorder=pstateorder;
       this.specialrequirements=pspecialrqueriments; 
       this.numberpeople=pnumberpeople;
       this.idcustomer=pidcustomer; 
       this.detailorders=pdetailorders; 
          
   }
      
}