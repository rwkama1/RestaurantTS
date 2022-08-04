const { VarChar,Int ,Date} = require("mssql");
const { Conection } = require("./Conection");


class DataTableCustomer
{
    //#region CRUD

    static registerTableCustomer=async(IDTable,IDCustomer)=>
    {
        let resultquery;
       let queryinsert = `  

          IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable AND StateT='Active')
          BEGIN
            select -1 as notexisttable
          END
          ELSE
          BEGIN
            IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
            BEGIN
              select -2 as noexistcustomer
            END
            ELSE
            BEGIN
              IF EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable AND IDCustomer=@IDCustomer)
              BEGIN
                select -3 as existtablecustomer
              END
              ELSE
              BEGIN 
               BEGIN TRANSACTION  

                INSERT INTO Table_Customer values (@IDTable,@IDCustomer)

                UPDATE TablesR SET StateT='Inactive' WHERE IDTable=@IDTable

                select 1 as insertsuccess

                
                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                COMMIT TRANSACTION  
                END   
              END
            END         
          END       
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDTable', Int, IDTable)
          .input('IDCustomer', Int, IDCustomer)
          .query(queryinsert)
          resultquery = result.recordset[0].notexisttable;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].noexistcustomer;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].existtablecustomer;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].insertsuccess;
                }
            }
          }
          pool.close();
          return resultquery;
  
    }

    static updateIDTableTableCustomer=async(IDTable,IDCustomer)=>
    {
        let resultquery;
       let queryinsert = ` 
        
       IF NOT EXISTS ( SELECT IDTable FROM TablesR WHERE IDTable=@IDTable AND StateT='Active')
       BEGIN
         select -1 as notexisttable
       END
       ELSE
       BEGIN
         IF NOT EXISTS ( SELECT IDCustomer FROM Customer WHERE IDCustomer=@IDCustomer)
         BEGIN
           select -2 as noexistcustomer
         END
         ELSE
         BEGIN
           IF  EXISTS ( SELECT IDTableC FROM Table_Customer WHERE IDTable=@IDTable AND IDCustomer=@IDCustomer)
           BEGIN
             select -3 as existtablecustomer
           END
           ELSE
           BEGIN 
            BEGIN TRANSACTION  


             UPDATE Table_Customer SET IDTable=@IDTable WHERE IDCustomer=@IDCustomer

             UPDATE TablesR SET StateT='Inactive' WHERE IDTable=@IDTable

             UPDATE TablesR SET TablesR.StateT='Active' FROM  TablesR INNER JOIN
             Table_Customer ON  Table_Customer.IDTable=TablesR.IDTable
             WHERE  Table_Customer.IDCustomer=@IDCustomer

             select 1 as insertsuccess

             
             IF(@@ERROR > 0)  
             BEGIN  
                 ROLLBACK TRANSACTION  
             END  
             ELSE  
             BEGIN  
             COMMIT TRANSACTION  
             END   
           END
         END         
       END  
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDTable', Int, IDTable)
          .input('IDCustomer', Int, IDCustomer)
          .query(queryinsert)
          resultquery = result.recordset[0].notexisttable;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].noexistcustomer;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].existtablecustomer;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].insertsuccess;
                }
            }
          }
          pool.close();
          return resultquery;
  
    }
    
    //#endregion
   
    //#region GETS

    static getPassengerService=async(numberps)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM PassengerServicee WHERE numberps=@numberps)
            BEGIN
              select -1 as notexistpassengerservice
            END
            ELSE
            BEGIN
                SELECT * FROM PassengerServicee inner join Passenger
                on PassengerServicee.idcardp=Passenger.IDCard
                WHERE numberps=@numberps
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('numberps', Int, numberps)
             .query(querysearch)
            resultquery = result.recordset[0].notexistpassengerservice; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let ps = new DTOPassengerService();
              this.getinformationPS(ps, resultrecordset);
              resultquery=ps
            }
           pool.close();
           return resultquery;
      
    
     }
    static getPassengerServicesMultipleNumber=async(arraynumberps,orderby="numberps")=>
    {
             let array=[];
            let querysearch = `

                SELECT  
                PassengerServicee.*, 
                Passenger.* 
                FROM 
                PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.IDCardP
                WHERE numberps in
                (
                  ${
                    this.forinsidestring(arraynumberps)
                    }
                )

                ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)        
             for (var ps of result.recordset) {
               let dtops  = new DTOPassengerService();
               this.getinformationPS(dtops,ps);
               array.push(dtops);
             } 
           pool.close();
           return array;
      
    
     }
    static getPassengerServices=async(orderby="numberps")=>
      {
               let array=[];
              let querysearch = `
 
                  SELECT  
                  PassengerServicee.*, 
                  Passenger.* 
                  FROM 
                  PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.IDCardP
                  ORDER BY ${orderby} desc
 
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)        
               for (var ps of result.recordset) {
                 let dtops  = new DTOPassengerService();
                 this.getinformationPS(dtops,ps);
                 array.push(dtops);
               } 
             pool.close();
             return array;
        
      
       }
    static getPassengerServiceByService=async(idservice)=>
       {
               let array=[];
               let querysearch = `
  
               SELECT 
               PassengerServicee.*, 
               Passenger.* 
               FROM 
               PassengerServicee 
               inner join DetailPassengerService on PassengerServicee.numberps = DetailPassengerService.numberpservice
               inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
               where idservicee = ${idservice}
               
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .query(querysearch)        
                for (var ps of result.recordset) {
                  let dtops  = new DTOPassengerService();
                  this.getinformationPS(dtops,ps);
                  array.push(dtops);
                } 
              pool.close();
              return array;
         
       
    } 
    static getPassengerServiceByPassenger=async(idcardpassenger,orderby="numberps")=>
    {
             let array=[];
            let querysearch = `

                SELECT 
                PassengerServicee.*, 
                 Passenger.* 
                FROM 
                PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
                 WHERE
                 idcardp=@IDCardPassengerr
                ORDER BY ${orderby} desc
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCardPassengerr', VarChar, idcardpassenger)
             .query(querysearch)        
             for (var ps of result.recordset) {
              let dtops  = new DTOPassengerService();
              this.getinformationPS(dtops,ps);
              array.push(dtops);
            } 
           pool.close();
           return array;
      
    
     } 
     static getPassengerServiceBetweenStartDate=async(date1,date2,orderby="numberps")=>
     {
             let array=[];
             let querysearch = `

             SELECT 
             PassengerServicee.*, 
             Passenger.* 
             FROM 
             PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
             WHERE startdate
             BETWEEN  @Date1 and @Date2 
             ORDER BY ${orderby} desc
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .input('Date1', Date, date1)
              .input('Date2', Date, date2)
              .query(querysearch)        
              for (var ps of result.recordset) {
                let dtops  = new DTOPassengerService();
                this.getinformationPS(dtops,ps);
                array.push(dtops);
              } 
            pool.close();
            return  array;
       
     
      } 
    static getPassengerServiceBetweenEndDate=async(date1,date2,orderby="numberps")=>
      {
              let array=[];
              let querysearch = `
 
              SELECT 
              PassengerServicee.*, 
              Passenger.* 
              FROM 
              PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
              WHERE enddate
              BETWEEN  @Date1 and @Date2 
              ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('Date1', Date, date1)
               .input('Date2', Date, date2)
               .query(querysearch)        
               for (var ps of result.recordset) {
                 let dtops  = new DTOPassengerService();
                 this.getinformationPS(dtops,ps);
                 array.push(dtops);
               } 
             pool.close();
             return  array;
        
      
       } 
    static getSearchPassengerService=async(
      valueservice1=0,valueservice2=99999,
      idservice1=0,idservice2=9999,
      numberps1=0,numberps2=9999,idpassenger="",startdate1='2000-08-08',
      startdate2='2100-08-08',enddate1='2000-08-08',
      enddate2='2100-08-08',total1=0,total2=99999
      ,orderby="numberps")=>
       {
               let array=[];
                let querysearch =
                `
                SELECT 
                PassengerServicee.*,
        
                DetailPassengerService.IDDPassangerService,
                DetailPassengerService.numberpservice,
                DetailPassengerService.idservicee,
        
                Servicee.*
            
                FROM DetailPassengerService 
                INNER JOIN Servicee
                on Servicee.idservice=DetailPassengerService.idservicee
                INNER JOIN PassengerServicee on PassengerServicee.numberps=DetailPassengerService.numberpservice
                WHERE
                NumberPS between ${numberps1} and ${numberps2}
                and IDCardP like '%${idpassenger}%'
                and StartDate between @startdate1 and @startdate2 
                and EndDate between  @enddate1 and @enddate2 
                and Total between ${total1} and ${total2}
                and DetailPassengerService.Amount between ${valueservice1} and ${valueservice2}
                and DetailPassengerService.IDServicee between ${idservice1} and ${idservice2}
                ORDER BY ${orderby} desc
                `
   
               let pool = await Conection.conection();
                const result = await pool.request()
                .input('startdate1', Date, startdate1)
                .input('startdate2', Date, startdate2)
                .input('enddate1', Date, enddate1)
                .input('enddate2', Date, enddate2)
                .query(querysearch)
                for (var r of result.recordset) {
                  let dtodps = new DTODetailPassengerService();
                this.getinformationDetailPS(dtodps,r);
                array.push(dtodps);
                
               } 
              pool.close();
              return array;
   
   
        }
    
    //#endregion

   //#region GET INFORMATION

   static getinformationTableCustomer(passengerservice, result) {

    
    passengerservice.NumberPS=result.NumberPS;
    passengerservice.StartDate=result.StartDate;
    passengerservice.EndDate=result.EndDate;
    passengerservice.Total=result.Total;
    passengerservice.Observations=result.Observations;
    DataPassenger.getinformation(passengerservice.Passenger,result)
    
   }
 
   //#endregion

   //#region OTHERS

   static forinsidestring(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (index===array.length-1) {
        stringelement=stringelement+element
      }
      else
      {
        stringelement=stringelement+element+","
      }
     
    }
    return stringelement
   
   }
   static forAddDetailPS(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
     

        stringelement=stringelement+
        `
        insert into DetailPassengerService values (IDENT_CURRENT('PassengerServicee'),
        ${element.Servicee.idservice},${element.Servicee.value})

        `
      
     
    }
    return stringelement
   
   }
   //#endregion
}
module.exports = { DataTableCustomer };