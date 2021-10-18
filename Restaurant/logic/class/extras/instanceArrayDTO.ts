
import LogicCategory from "../business_class/LCategory";
import LogicCustomer from "../business_class/LCustomer";
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
   


}