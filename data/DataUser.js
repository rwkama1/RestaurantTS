
const { VarChar } = require("mssql");
const { DTOUser } = require("../DTO/DTOUser");
const { Conection } = require("./Conection");

class DataUser
{
    //#region CRUD

    static registerUser=async(dtouser)=>
    {
         let resultquery;
          let queryinsert = `

          IF  EXISTS ( SELECT IDCardU FROM Users WHERE IDCardU=@IDCardU)
          BEGIN
            select -1 as existuser
          END
          ELSE
          BEGIN
            insert into Users values
            (@IDCardU,@NamesUserU,@CityU,@TypeUserU,@HashhU,@PasswordUserU)
            select 1 as insertsuccess
          END 
        
          `;

          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCardU', VarChar, dtouser.IDCardU)
          .input('NamesUserU', VarChar, dtouser.NamesUserU)
          .input('CityU', VarChar, dtouser.CityU)
          .input('TypeUserU', VarChar, dtouser.TypeUserU)
          .input('HashhU',VarChar, dtouser.HashhU)
          .input('PasswordUserU', VarChar, dtouser.PasswordUserU)
          .query(queryinsert)
          resultquery = result.recordset[0].existuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return resultquery;
  
    }
    static updateNameCityTypeUser=async(idcarduser,nameuser,cityuser,typeUser)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDCardU FROM Users WHERE IDCardU=@IDCardU)
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
              Update Users Set CityU=@CityU,
              NamesUserU=@NamesUserU,TypeUserU=@TypeUserU
              where IDCardU=@IDCardU
              select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDCardU', VarChar, idcarduser)
          .input('NamesUserU', VarChar, nameuser)
          .input('TypeUserU', VarChar, typeUser)
          .input('CityU', VarChar, cityuser)
          .query(queryupdate)         
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static updatePasswordUser=async(idcard,password,hash)=>
    {
           let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT IDCardU FROM Users WHERE IDCardU=@IDCardU)
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
            Update Users Set PasswordUserU=@PasswordUserU,HashhU=@HashhU 
            where IDCardU=@IDCardU
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCardU', VarChar, idcard)
          .input('HashhU', VarChar, hash)
          .input('PasswordUserU', VarChar, password)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }    
    static deleteUser=async(idcard)=>
    {
          let resultquery;
          let queryupdate =
          `
          IF NOT EXISTS ( SELECT IDCardU FROM Users WHERE IDCardU=@IDCardU)
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
            DELETE FROM Users where IDCardU=@IDCardU
            select 1 as deletesuccess
          END

          `;
          let pool = await Conection.conection();  
          const result = await pool.request()
          .input('IDCardU', VarChar,idcard)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].deletesuccess;
          }
          pool.close();
          return resultquery;
  
    }
    
    //#endregion

    //#region GETS

    static getUser=async(idcard)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT IDCardU FROM Users WHERE IDCardU=@IDCardU)
            BEGIN
              select -1 as notexistuser
            END
            ELSE
            BEGIN
               SELECT * FROM Users WHERE IDCardU=@IDCardU
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCardU', VarChar, idcard)
             .query(querysearch)
              resultquery = result.recordset[0].notexistuser; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let user = new DTOUser();
              this.getinformation(user, resultrecordset);
              resultquery=user
            }
           pool.close();
           return resultquery;
      
    
     }
     static getUsers=async(orderby="IDCardU")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Users 
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var u of result.recordset) {
              let user = new DTOUser();
              this.getinformation(user,u);
              array.push(user);
            } 
           pool.close();
           return array;
      
    
     }
     static getSearchUsers=async(idcardu="",nameu="",cityu="",typeuser="" 
     ,orderby="IDCardU")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Users 
                WHERE   IDCardU LIKE '%${idcardu}%' 
                AND NamesUserU LIKE '%${nameu}%' 
                AND CityU LIKE '%${cityu}%' 
                AND TypeUserU LIKE '%${typeuser}%' 
                ORDER BY ${orderby} desc
             `

             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var u of result.recordset) {
                let user = new DTOUser();
              this.getinformation(user,u);
              array.push(user);
             } 
            pool.close();
            return array;
      }

    //#endregion

   //#region GET INFORMATION

   static getinformation(user, result) {
    
    user.IDCardU=result.IDCardU;
    user.NamesUserU=result.NamesUserU
    user.CityU=result.CityU
    user.TypeUserU=result.TypeUserU
    user.HashhU=result.HashhU
    user.PasswordUserU=result.PasswordUserU
   }

   //#endregion
}
module.exports = { DataUser };