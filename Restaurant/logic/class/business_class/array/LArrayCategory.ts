import LogicCategory from "../LCategory";

export class ArrayCategories{
    
    arraycat: LogicCategory[];
    
    constructor(parraycat:LogicCategory[])
       {
        this.arraycat=parraycat;
       }
     
    search=(name:string)=>
    {
    let listc=this.arraycat;
    for(let c of listc)
      {
        if(name===c.name)
        {
          return c;
        }
      }
      return null;
    }

    getSort=()=>
    {
      let listc=this.arraycat
     const sortarray=listc.sort((a, b) => a.name.localeCompare(b.name));
     return sortarray
    }
}