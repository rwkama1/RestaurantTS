const { DataBill } = require("./data/DataBill");
const { DataCategory } = require("./data/DataCategory");
const { DataCustomer } = require("./data/DataCustomer");
const { DataDish } = require("./data/DataDish");
const { DataOrder } = require("./data/DataOrder");
const { DataTable } = require("./data/DataTable");
const { DataTableCustomer } = require("./data/DataTableCustomer");
const { DataUser } = require("./data/DataUser");
const { DishIngredients } = require("./DishIngredients/dishes");
const { DTOCategory } = require("./DTO/DTOCategory");
const { DTOCustomer } = require("./DTO/DTOCustomer");
const { DTODish } = require("./DTO/DTODish");
const { DTOOrder } = require("./DTO/DTOOrder");
const { DTOUser } = require("./DTO/DTOUser");
const { HashPassword } = require("./Hash_Login/hashPassword");
const { LoginUser } = require("./Hash_Login/LoginUser");
const { Order } = require("./Orders/order");

//#region USERS

let usermaintenance=async()=>
{

    // async function registerUser() {
    //     for (let i = 1; i < 10; i++) {

    //         let dtouser = new DTOUser();
    //         dtouser.IDCardU=`11111111111${i}` ;
    //         dtouser.NamesUserU=`User${i}`;
    //         dtouser.CityU=`City${i}`;
    //         dtouser.TypeUserU="Administrator" ;
    //         dtouser.PasswordUserU=`Password${i}`;

    //         const passh = HashPassword.hashPassword(dtouser.PasswordUserU);
    //         dtouser.PasswordUserU = passh.hash;
    //         dtouser.HashhU = passh.salt;
    //         let registeruser = await DataUser.registerUser(dtouser);
    //         if (registeruser===-1) {
    //             throw new Error("User already exists");
    //         }
    //          console.log("The user registered successfully");
    //     }
    // }
    //  await registerUser();



    // async function updateNameCityTypeUser() {
    //     let typeuser = "Cashier";
    //     if (typeuser != "Administrator" && typeuser != "Waiter" && typeuser != "Chef"
    //         && typeuser != "Cashier") {
    //         throw new Error("The user can only be of the type Administrator,Waiter,Chef and Cashier");
    //     }
    //     let updateNameCityUser = await DataUser.updateNameCityTypeUser("111111111111",
    //         "NameUpdated", "CityUpdated", typeuser);
    //     if (updateNameCityUser === -1) {
    //         throw new Error("User no exists");
    //     }
    //     console.log("The user updated successfully");
    // }
    // await updateNameCityTypeUser();



    // async function updateUserNamePassword() {

    //     const passh = HashPassword.hashPassword("PasswordUpdated");
    //     let hashpassword = passh.hash;
    //     let salt = passh.salt;

    //         let updatePasswordUser = await DataUser.updatePasswordUser("111111111111",hashpassword, salt);
    //         if (updatePasswordUser===-1) {
    //             throw new Error("The user does not exists");
    //         }
    //         console.log("The password was updated successfully");

    //     }
    //   await updateUserNamePassword();


    //     let deleteUser = await DataUser.deleteUser("111111111117");
    //      if (deleteUser===-1) {
    //          throw new Error("The user does not exists");
    //      }
    //    console.log("The user was deleted successfully");


    // let autenticationuser=async()=>
    // {
    //     let loginuser = await LoginUser.loginUser('111111111111','PasswordUpdated')
    //     console.log(loginuser);


    //     let getuserlogin = await LoginUser.getUserLogin()
    //     console.log(getuserlogin);

    //     let logout = await LoginUser.logoutUser()
    //     console.log(logout);

    // }
    // autenticationuser().then()


        // let getUser = await DataUser.getUser('111111111111')
        // console.log(getUser);

        // let getUsers = await DataUser.getUsers()
        // console.log(getUsers);

        //   let getSearchUsers = await DataUser.getSearchUsers(
        //    "","","","Cash","CityU"
        // )
        // console.log(getSearchUsers);

}
usermaintenance().then()

//#endregion
//#region CUSTOMER

let customermaintenace=async()=>
{
    //   async function registerCustomer() {
    //     for (let i = 1; i < 20; i++) {

    //         let dtocust = new DTOCustomer();
    //         dtocust.NamesC=`Customer${i}`;
    //         dtocust.LastNameC=`LastNameCustomer${i}`;
    //         dtocust.PhoneNumberC=`1111111111${i}` ;
           
    //         let registerCustomer = await DataCustomer.registerCustomer(dtocust);
    //          console.log("The customer registered successfully");
    //     }
    // }
    //  await registerCustomer();


    // async function updateCustomer() {
    //         let dtocust = new DTOCustomer();
    //         dtocust.IDCustomer=1;
    //         dtocust.NamesC=`NameUpdated`;
    //         dtocust.LastNameC=`LastNameCustomer`;
    //         dtocust.PhoneNumberC=`11111111111` ;
    //     let updateCustomer = await DataCustomer.updateCustomer(dtocust);
    //     if (updateCustomer === -1) {
    //         throw new Error("Customer no exists");
    //     }
    //     console.log("The customer updated successfully");
    // }
    // await updateCustomer();

    
        // let getCustomer = await DataCustomer.getCustomer(1)
        // console.log(getCustomer);

        // let getCustomers = await DataCustomer.getCustomers()
        // console.log(getCustomers);

        //   let getSearchCustomers = await DataCustomer.getSearchCustomers(
        //     0,5,"","","","NamesC"
        //   )
        // console.log(getSearchCustomers);



}
customermaintenace().then()

//#endregion
//#region CATEGORY

let categorymaintenance=async()=>
{
    //   async function registerCategory() {
    //     for (let i = 1; i < 10; i++) {

    //         let dtocat = new DTOCategory();
    //         dtocat.NameC=`Category${i}`;
    //         dtocat.DescriptionC=`Description${i}`;
           
    //         let registerCategory = await DataCategory.registerCategory(dtocat);
    //          console.log("The category registered successfully");
    //     }
    // }
    //  await registerCategory();


    // async function updateCategory() {
    //         let dtocat = new DTOCategory();
    //         dtocat.IDCategory=9;
    //         dtocat.NameC=`CategoryUpdate`;
    //         dtocat.DescriptionC=`DescriptionUpdate`;
    //     let updateCategory = await DataCategory.updateCategory(dtocat);
    //     if (updateCategory === -1) {
    //         throw new Error("Category no exists");
    //     }
    //     console.log("The category updated successfully");
    // }
    // await updateCategory();

    //  let getCategory = await DataCategory.getCategory(1)
    //     console.log(getCategory);

    //  let getSearchCategories = await DataCategory.getSearchCategories(
    //     0,5,"","idcategory"
    //  )
    //  console.log(getSearchCategories);



}
categorymaintenance().then()
//#endregion
//#region  DISHES

let dishesmaintenace=async()=>
{
    //#region REGISTER

//     let registerIngredient1=DishIngredients.registerIngredient("Ingredient1",20,2);
//     if (registerIngredient1===-1) {
//         throw new Error("The name ingredient already exist in the list")
//     }
//     console.log(registerIngredient1);


//     let registerIngredient2=DishIngredients.registerIngredient("Ingredient2",20,1);
//     if (registerIngredient2===-1) {
//         throw new Error("The name ingredient already exist in the list")
//     }
//     console.log(registerIngredient2);

//     // let removeIngredient=DishIngredients.removeIngredient("Ingredient2");
//     // if (removeIngredient===-1) {
//     //     throw new Error("The name ingredient not exist in the list")
//     // }
//     // console.log(removeIngredient);


//     let registerIngredient3=DishIngredients.registerIngredient("Ingredient3",21,1);
//     if (registerIngredient3===-1) {
//         throw new Error("The name ingredient already exist in the list")
//     }
//     console.log(registerIngredient3);


//     let getArrayIngredients=DishIngredients.getArrayIngredients();
//     console.log(getArrayIngredients);

//     // let clearArrayIngredients=DishIngredients.clearArrayIngredients();
//     // console.log(clearArrayIngredients);

//     // let getArrayIngredients2=DishIngredients.getArrayIngredients();
//     // console.log(getArrayIngredients2);

//     let calculateCostDish=DishIngredients.calculateCostDish();
//     if (calculateCostDish===-1) {
//         throw new Error("The ingredient lists is empty")
//     }
//     console.log(calculateCostDish);

//   let dtodishes=new DTODish();
//   dtodishes.NameD="NameDish5";
//   dtodishes.Category.IDCategory=4;
//   dtodishes.DescriptionD="Description4";
//   dtodishes.ImgD="UrlImg";
//   dtodishes.CostD=calculateCostDish;
//   dtodishes.PriceD=50;//this is the price that is indicated once knowing the cost
//   dtodishes.QuantityAD=0;
 
//   let registerDish=await DataDish.registerDish(dtodishes,getArrayIngredients);
//     if (registerDish===-1) {
//         throw new Error("Category no exists")
//     }
//     console.log(registerDish);

    //#endregion
    //#region  MAINTENACE

    // let dtodishes=new DTODish();
    // dtodishes.IDDishh=3;
    // dtodishes.NameD="NameUpdate";
    // dtodishes.Category.IDCategory=3;
    // dtodishes.PriceD=65;
    // dtodishes.DescriptionD="DescriptionUpdate";
    // dtodishes.ImgD="UrlImgUpdate";
    // let updateDish=await DataDish.updateDish(dtodishes);
    // if (updateDish===-1) {
    //     throw new Error("Dish no exist")
    // }
    // if (updateDish===-2) {
    //     throw new Error("Category no exist")
    // }
    // console.log(updateDish);


//  let deleteDish=await DataDish.deleteDish(3);
//     if (deleteDish===-1) {
//         throw new Error("Dish no exist")
//     }
   
//     console.log(deleteDish);
   //      let addQuantity=await DataDish.addQuantity(5,12);
    //     if (addQuantity===-1) {
    //         throw new Error("Dish no exist")
    //     }
   
    // console.log(addQuantity);

        //  let removeQuantity=await DataDish.removeQuantity(6,1);
        // if (removeQuantity===-1) {
        //     throw new Error("Dish no exist")
        // }
        // console.log(removeQuantity);

        
    //#endregion

    //#region INGREDIENTS

    //  let registerIngredient=await DataDish.registerIngredient(4,"Ingredient3",20,2);
    // if (registerIngredient===-1) {
    //     throw new Error("Dish no exist")
    // }
   
    // console.log(registerIngredient);


    //  let updateIngredientName=await DataDish.updateIngredientName(13,"IngredientUpdate",5);
    //     if (updateIngredientName===-1) {
    //         throw new Error("Ingredient no exist")
    //     }
   
    // console.log(updateIngredientName);


    //   let removeIngredient=await DataDish.removeIngredient(12,5);
    //     if (removeIngredient===-1) {
    //         throw new Error("Ingredient no exist")
    //     }
   
    // console.log(removeIngredient);


    // let getIngredient=await DataDish.getIngredient(20);
    // console.log(getIngredient);

    //     let getIngredientsDish=await DataDish.getIngredientsDish(8);
    // console.log(getIngredientsDish);

    //#endregion
    //#region GETS

    // let getDish=await DataDish.getDish(9);
    // console.log(getDish);

    //     let getDishByCategory=await DataDish.getDishByCategory(4);
    // console.log(getDishByCategory);

    // let getSearchDish=await DataDish.getSearchDish(0,9999,
    //    "",0,9999,0,9999,0,9999,0,9999,"",0,9999,0,9999,
    //    0,9999,"2" );
    // console.log(getSearchDish);


    //#endregion
}
dishesmaintenace().then()

//#endregion
//#region TABLES
let tablemaintenance=async()=>
{
    
    // async function registerTable() {
    //     for (let index = 0; index < 15; index++) {

    //         let registerTable = await DataTable.registerTable(4);
    //         console.log(registerTable);
    //     }
    // }
    // await registerTable();

    //  let disableTable = await DataTable.disableTable(20);
    // console.log(disableTable);

    // let enableTable = await DataTable.enableTable(20);
    // console.log(enableTable);

    // let getTable=await DataTable.getTable(1);
    // console.log(getTable);

    // let getSearchTables=await DataTable.getSearchTables();
    // console.log(getSearchTables);


}
tablemaintenance().then()
//#endregion
//#region ORDER
let ordermaintenance=async()=>
{
    //#region ONLINE ORDER

//     let registerDish1=Order.registerDish(6,40,2);
//     if (registerDish1===-1) {
//         throw new Error("The number dish already exist in the list")
//     }
//     console.log(registerDish1);

//     // let registerDish2=Order.registerDish(7,60,1);
//     // if (registerDish2===-1) {
//     //     throw new Error("The number dish already exist in the list")
//     // }
//     // console.log(registerDish2);

//     // let registerDish3=Order.registerDish(8,81,3);
//     // if (registerDish3===-1) {
//     //     throw new Error("The number dish already exist in the list")
//     // }
//     // console.log(registerDish3);

  
//     let getDishArray=Order.getDishArray();
//     console.log(getDishArray);


//     // let cleanIDDishArray=Order.cleanIDDishArray(8);
//     // console.log(cleanIDDishArray);

//     // let removeIDDish=Order.removeIDDish(8);
//     // console.log(removeIDDish);

//     // let getDishArray2=Order.getDishArray();
//     // console.log(getDishArray2);

//     let getDishesMultipleID=await DataDish.getDishesMultipleID(getDishArray);
//     console.log(getDishesMultipleID);

//     let dtocustomer=new DTOCustomer();
//     dtocustomer.NamesC=`NameCustomer`;
//     dtocustomer.LastNameC=`LastNameCustomer`;
//     dtocustomer.PhoneNumberC=`111111111111`;

//     let dtoorder=new DTOOrder();

  
// let newdate=new Date(2022,08,27);
// newdate.setUTCHours(15,00);
//  dtoorder.DateO=newdate;
//    dtoorder.SpecialRequirement="SpecialRequirement"; 
//    dtoorder.NumberPeople=2;  
//    dtoorder.Customer=dtocustomer;   

//   let registerOnlineOrder=await DataOrder.registerOnlineOrder(dtoorder,getDishArray);
//   console.log(registerOnlineOrder)

    //#endregion

    //#region RESTAURANT ORDER
           
//         let dtocustomer=new DTOCustomer();
//         dtocustomer.IDCustomer=8;
//         dtocustomer.NamesC="NameCustomerorder";
//         dtocustomer.LastNameC="LastNameCustomer";

//     let registerDish1=Order.registerDish(6,40,2);
//     if (registerDish1===-1) {
//         throw new Error("The number dish already exist in the list")
//     }
//     console.log(registerDish1);



  
//     let getDishArray=Order.getDishArray();
//     console.log(getDishArray);



//     let getDishesMultipleID=await DataDish.getDishesMultipleID(getDishArray);
//     console.log(getDishesMultipleID);



//     let dtoorder=new DTOOrder();

//    let newdate=new Date(2022,08,27);
//    newdate.setUTCHours(15,00);
//    dtoorder.DateO=newdate;
//    dtoorder.SpecialRequirement="SpecialRequirement"; 
//    dtoorder.NumberPeople=2;  
//    dtoorder.Customer=dtocustomer;   

//   let registerOrderRestaurant=await DataOrder.registerOrderRestaurant(dtoorder,getDishArray);
//   console.log(registerOrderRestaurant)

    //#endregion

    //#region MAINTENANCE

        // let addDetailOrder=await DataOrder.addDetailOrder(58,1,20);
        // console.log(addDetailOrder);

        // let removeDetailOrder=await DataOrder.removeDetailOrder(20,7);
        // console.log(removeDetailOrder);
        
        // let updateDetailOrderQuantity=await DataOrder.updateDetailOrderQuantity(20,6,3);
        // console.log(updateDetailOrderQuantity);

        //   let updateSpecialRequirementsNumberPeople=await DataOrder.updateSpecialRequirementsNumberPeople(23,"SpecialRUpdate",3);
        // console.log(updateSpecialRequirementsNumberPeople);

          
        // let cancelOrder=await DataOrder.cancelOrder(10);
        // console.log(cancelOrder);

        // let confirmOrder=await DataOrder.confirmOrder(10);
        // console.log(confirmOrder);

        //    let newdate=new Date(2022,07,28);
        //    newdate.setUTCHours(15,00);

        //  let updateDateOOrder=await DataOrder.updateDateOOrder(12,newdate);
        // console.log(updateDateOOrder);

    //#endregion

    //#region GETS

    // let getDetailOrder=await DataOrder.getDetailOrder(23,8);
    // console.log(getDetailOrder);

    // let getOrder=await DataOrder.getOrder(22);
    // console.log(getOrder);


    //     let dateo1filter1=new Date(2000,09-1,27);
    //     dateo1filter1.setUTCHours(14,00);

    //     let dateo1filter2=new Date(2100,09-1,27);
    //     dateo1filter2.setUTCHours(16,00);
        

    //   let getSearchOrder=await DataOrder.getSearchOrder(0,9999,
    //     dateo1filter1,dateo1filter2,
    //     "Pending","",0,9999,0,9999,"","",0,9999,0,99999,7,8
    //     );
    //     console.log(getSearchOrder);

    //  let getMultipleIdOrder=await DataOrder.getMultipleIdOrder([24,26]);
    // console.log(getMultipleIdOrder);



    //#endregion


}
ordermaintenance().then()
//#endregion
//#region TABLE CUSTOMER

let tablecustomer=async()=>
{

        // let registerTableCustomer=await DataTableCustomer.registerTableCustomer(4,33);
        // console.log(registerTableCustomer);

        // let updateIDTableTableCustomer=await DataTableCustomer.updateIDTableTableCustomer(3,32);
        // console.log(updateIDTableTableCustomer);

        // let deleteTableCustomer=await DataTableCustomer.deleteTableCustomer(1,31);
        // console.log(deleteTableCustomer);

        // GETS

        //   let getTableCustomer=await DataTableCustomer.getTableCustomer(1,30);
        // console.log(getTableCustomer);

        // let getMultipleIDTableTableCustomer=await DataTableCustomer.getMultipleIDTableTableCustomer([1,2]);
        // console.log(getMultipleIDTableTableCustomer);

        // let getMultipleIDCustomerTableCustomer=await DataTableCustomer.getMultipleIDCustomerTableCustomer([30,35,36]);
        // console.log(getMultipleIDCustomerTableCustomer);


        // let getSearchTableCustomer=await DataTableCustomer.getSearchTableCustomer(
        //     0,9999,0,9999,0,9999,"","",0,9999
        // );
        // console.log(getSearchTableCustomer);

}

tablecustomer().then()

//#endregion
//#region BILL

let billmaintenance=async()=>
{
    // let datenow=new Date();
    // let billdate=  new Date(datenow.getFullYear(),datenow.getMonth(),datenow.getDate());
    //  let registerBill=await DataBill.registerBill(
    //     billdate,24,33,22
    //     );
    // console.log(registerBill);

    //  let datenow=new Date();
    // let billdate=  new Date(datenow.getFullYear(),datenow.getMonth(),datenow.getDate());
    //       let updateDateBill=await DataBill.updateDateBill(
    //     billdate,2
    //     );
    // console.log(updateDateBill);

    //  let collectBill=await DataBill.collectBill(4);
    // console.log(collectBill);

    // let cancelBill=await DataBill.cancelBill(2);
    // console.log(cancelBill);

    //GETS 
    
    // let getBill=await DataBill.getBill(4);
    // console.log(getBill);

    // let getBillMultipleID=await DataBill.getBillMultipleID([2,3]);
    // console.log(getBillMultipleID);

    //     let getSearchBill=await DataBill.getSearchBill(
    //         3,3,new Date(2022,08-1,02),new Date(2022,09-1,18)
    //         ,0,9999,0,9999,0,9999,"",0,9999,0,9999,""
    //     );
    // console.log(getSearchBill);


}
billmaintenance().then()

//#endregion



