

const { DataUser } = require("../data/DataUser");
const { HashPassword } = require("./hashPassword");

 class LoginUser
{

    //#region Propieties

     static _userlogin = null;
     static get userlogin() {
         return LoginUser._userlogin;
     }
     static set userlogin(value) {
        LoginUser._userlogin = value;
     }
   
    //#endregion

  //#region Login
  
      static loginUser=async(idcard,password)=>
    {
       
        let getUser = await DataUser.getUser(idcard);
        if (getUser===-1) {
           throw new Error("That User does not exists in the system"); 
        }
        const verifyp=await HashPassword.verifyPassword(password,getUser.PasswordUserU,getUser.HashhU);
   
        if(verifyp===false)
        {
            throw new Error("Wrong password");
        }
   
       this.userlogin=getUser;
      
       return this.userlogin;
    }
    
     static  getUserLogin()
    {
        if(this.userlogin!=null)
        {
            return this.userlogin;
             
        }
        else
        {
            throw new Error("There is no User logged in");
        }
    }
     static  logoutUser()
    {
        if(this.userlogin!=null)
        {
            this.userlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }

    //#endregion

}
module.exports = { LoginUser };