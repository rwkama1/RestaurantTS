
import DTODish from "../../../shared/entity/DTODish";
import DTOOrder from "../../../shared/entity/DTOOrder";
import DTOTable from "../../../shared/entity/DTOTable";
import DTOTableCustomer from "../../../shared/entity/DTOTableCustomer";
import LogicCategory from "../business_class/LCategory";
import LogicCustomer from "../business_class/LCustomer";
import LogicDish from "../business_class/LDish";
import LogicOrder from "../business_class/LOrder";
import LogicTable from "../business_class/LTable";
import LogicTableCustomer from "../business_class/LTableCustomer";
import LogicUser from "../business_class/LUser";

export class InstanceArrayDTO
{
  
    static instanceArrayUser=(larrayuser:LogicUser[])=>
    {
        let arraydto=[];
        for(let user of larrayuser)
        {
            let dtouser=user.getDTO();
            arraydto.push(dtouser);

        }
        return arraydto;       
    }
    static instanceArrayCustomer=(larrayc:LogicCustomer[])=>
    {
        let arraydto=[];
        for(let c of larrayc)
        {
            let dtc=c.getDTO();
            arraydto.push(dtc);

        }
        return arraydto;       
    }
    static instanceArrayCategory=(larrayc:LogicCategory[])=>
    {
        let arraydto=[];
        for(let cat of larrayc)
        {
            let dtcat=cat.getDTO();
            arraydto.push(dtcat);

        }
        return arraydto;       
    }
    static instanceArrayDish=(larrayd:LogicDish[])=>
    {
        let arraydto:DTODish[]=[];
        for(let ldish of larrayd)
        {
            let dtdish=ldish.getDTO();
            arraydto.push(dtdish);

        }
        return arraydto;       
    }
    static instanceArrayTable=(larrayt:LogicTable[])=>
    {
        let arraydto:DTOTable[]=[];
        for(let ltable of larrayt)
        {
            let dtotable=ltable.getDTO();
            arraydto.push(dtotable);

        }
        return arraydto;       
    }
    static instanceArrayTableCustomer=(larraytc:LogicTableCustomer[])=>
    {
        let arraydto:DTOTableCustomer[]=[];
        for(let ltabletc of larraytc)
        {
            let dtotc=ltabletc.getDTO();
            arraydto.push(dtotc);

        }
        return arraydto;       
    }
    static instanceArrayOrder=(larrayo:LogicOrder[])=>
    {
        let arraydto:DTOOrder[]=[];
        for(let lorder of larrayo)
        {
            let dto=lorder.getDTO();
            arraydto.push(dto);

        }
        return arraydto;       
    }
   


}