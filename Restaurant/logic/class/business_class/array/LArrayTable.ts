import LogicTable from "../LTable";

export class ArrayTable
{  
    arrayt: LogicTable[];
    
    constructor(parrayt:LogicTable[])
       {
        this.arrayt=parrayt;
       } 
    search=(id:number)=>
    {
    for(let t of this.arrayt)
      {
        if(id===t.idtable)
        {
          return t;
        }
      }
      return null;
    }
    getAvailable=()=>
    {
        let newarray:LogicTable[]=[];
        for(let t of this.arrayt)
        {
          if(t.statetable==="Available")
          {
           newarray.push(t);

          }
        }
        return newarray;
    }
    getBusy=()=>
    {
        let newarray:LogicTable[]=[];
        for(let t of this.arrayt)
        {
          if(t.statetable==="Busy")
          {
           newarray.push(t);

          }
        }
        return newarray;
    }
}
