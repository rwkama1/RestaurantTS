import DTODeatilOrder from "../../../shared/entity/DTODetailOrder";
import DTOOrder from "../../../shared/entity/DTOOrder";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LGetDish } from "../dish_maintenance/maintenance/LGetDish";
import LogicCustomer from "./LCustomer";
import LogicDetailOrder from "./LDetailOrder";

export  default class LogicOrder
{
    private _idorder: number;
    private _dateorder: Date;
    private _stateorder: string;
    private _specialrequirements: string;
    private _numberpeople: number;
    private _customer: LogicCustomer;
    private _detailorders: LogicDetailOrder[];

    //GETTERS

    public get idorder(): number {
        return this._idorder;
    }
    public get dateorder(): Date {
        return this._dateorder;
    }
    public get stateorder(): string {
        return this._stateorder;
    }
    public get specialrequirements(): string {
        return this._specialrequirements;
    }
    public get numberpeople(): number {
        return this._numberpeople;
    }
    public get customer(): LogicCustomer {
        return this._customer;
    }
    public get detailorders(): LogicDetailOrder[] {
        return this._detailorders;
    }

    //SETTERS

    public set idorder(value: number) {
        this._idorder = value;
    }
    public set dateorder(value: Date) {

        this._dateorder = value;
    }
    public set stateorder(value: string) {
        if (value.trim()!="Pending" && value.trim()!="Confirmed"&& value.trim()!="Cashed"&&value.trim()!="Canceled")
        {
            throw new LogicException("The state can only be Pending,Confirmed,Canceled and Cashed");
        }
        this._stateorder = value;
    }
    public set specialrequirements(value: string) {
        if (value.trim() === "")
    {
        throw new LogicException("The Special Requirements cannot be empty");
    }
        this._specialrequirements = value;
    }
    public set numberpeople(value: number) {
        if(value<1)
        {
            throw new LogicException("The Number of People must be grater than 0");
            
        }
        this._numberpeople = value;
    }
    public set customer(value: LogicCustomer) {
        if(value===null)
        {
            throw new LogicException("The Customer does not exists in the system");
            
        }
        this._customer = value;
    }
    public set detailorders(value: LogicDetailOrder[]) {
        this._detailorders = value;
    }

    register=(date:Date,specialr:string,npeople:number)=>
    {
        this.dateorder=date;
        this.specialrequirements=specialr;
        this.numberpeople=npeople;
        return this.getDTO()
    }
    calculateTotal=()=>
    {
        let total=0;
        for(let dorder of this.detailorders)
        {
            total=total+dorder.amountdo;
        }
        return total
    }
    ///*************** DETAIL ORDERS ******************     */

    registerDetailOrder=async(id:number,quantity:number)=> {

        let lengtharraydo=this.detailorders.length+1;
        let ldish=await LGetDish.getLDish(id);
        let ldetailorder=new LogicDetailOrder(lengtharraydo,quantity,40,ldish);
        this.detailorders.push(ldetailorder);
        return ldetailorder.getDTO()
    
    }
    removeDetailOrder=(iddorder: number)=> {
        let listdetailorder = this.detailorders;
        for (let i =0; i < listdetailorder.length; i++)
        {
            if (listdetailorder[i].iddetailorder === iddorder) {
                listdetailorder.splice(i,1);
                break;
            }
        }
      
        return true
    }
    updateDetailOrder=async(iddetailo:number,iddish:number,quantity:number)=> {
        for(let ldetailo of this.detailorders)
        {
            if(ldetailo.iddetailorder===iddetailo)
            {
               await ldetailo.update(iddish,quantity);
                return this.getDTO()
            }
        }  
    
    }
  
    getDTO=()=>
    {
        let arraydo:DTODeatilOrder[]=[];
        for(let ldorder of this.detailorders)
        {
            let dtodo=ldorder.getDTO();
            arraydo.push(dtodo);
        }
        let dto=new DTOOrder(this.idorder,this.dateorder,this.stateorder,
            this.specialrequirements,this.numberpeople,this.customer.id,arraydo);
        return dto
    }
    
   constructor(pidorder:number,pdateorder:Date,pstateorder:string,
    pspecialrqueriments:string,pnumberpeople:number,pcustomer:LogicCustomer,
    pdetailorders:LogicDetailOrder[])
   {
       this.idorder=pidorder;
       this.dateorder=pdateorder; 
       this.stateorder=pstateorder;
       this.specialrequirements=pspecialrqueriments; 
       this.numberpeople=pnumberpeople;
       this.customer=pcustomer; 
       this.detailorders=pdetailorders; 
          
   }
   
      
}