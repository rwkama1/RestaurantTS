
const {FactoryLogic}=require("./Restaurant/dist/logic/FactoryLogic");
const { default: DTOCategory } = require("./Restaurant/dist/shared/entity/DTOCategory");
const { default: DTOCustomer } = require("./Restaurant/dist/shared/entity/DTOCustomer");
const { default: DTODish } = require("./Restaurant/dist/shared/entity/DTODish");
const { default: DTODishC } = require("./Restaurant/dist/shared/entity/DTODishC");
const { default: DTOTable } = require("./Restaurant/dist/shared/entity/DTOTable");
// const { default: DTOPassenger } = require("./Hotel/dist/shared/entity/DTOPassenger");
// const { default: DTORoom } = require("./Hotel/dist/shared/entity/DTORoom");
// const { default: DTOService } = require("./Hotel/dist/shared/entity/DTOService");
const { default: DTOUser } = require("./Restaurant/dist/shared/entity/DTOUser");
// const { default: DTOReservation } = require("./Hotel/dist/shared/entity/DTOReservation");
// const { default: DTOReservationDetail } = require("./Hotel/dist/shared/entity/DTOReservationDetail");
//  const { default: DTOPassengerService } = require("./Hotel/dist/shared/entity/DTOPassengerService");
//  const { default: DTODPassengerService } = require("./Hotel/dist/shared/entity/DTODPassengerService");






// let dtoroom=new DTORoom(7,
//   "dfhdfh","dfshdfh",
//   "safasf","asgagasgasgasgasasg",50.55,"Active","asd.jpg");

// let dtoservice=new DTOService(2,"Service2",9.10);

// let dtoreservation=new DTOReservation(1,"September 17, 2021", new Date("October 17, 2021"),
//  new Date("November 17, 2021"),"Confirmed","Confirmed","Hotel",546,"6789798",[]);


//  let dtopassengerservice=new DTOPassengerService(0,"456456546",new Date("October 02,2021"),new Date("October 8,2021"),0,"asd",[]);

// ************************ USER MAINTENACE ******************** */

// let dtuser=new DTOUser("123456789","User1","City1","Administrator","","User1234567");

// FactoryLogic.UserController().registerUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().updateUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().deleteUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getUser("345678678").then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getLSortUsers().then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getUsers().then(data => {
//     console.log(data);
// });
// let autenticationuser=async()=>
// {
//     let login=await FactoryLogic.UserController().loginUser("123456789","User1234567");
//     console.log(login);
//     let userlogin= FactoryLogic.UserController().getloginUser();
//     console.log(userlogin);
//     let logout= FactoryLogic.UserController().logout();
//     console.log(logout);
//     let userlogin2= FactoryLogic.UserController().getloginUser();
//     console.log(userlogin2);
// }
// autenticationuser().then(

// )

// ************************* CUSTOMER MAINTENANCE ********************************** */


// let dtcustomer=new DTOCustomer(0,"Customer","LastName");

// let customermaintenace=async()=>
// {
 
  //  // REGISTER CUSTOMER

  //   let addc=await FactoryLogic.CustomerController().registerCustomer(dtcustomer);
  //   console.log(addc);

  //   // GETS

  //    let getscust=await FactoryLogic.CustomerController().getLSortCustomers();
  //   console.log(getscust);
  //   let getcname=await FactoryLogic.CustomerController().getLCustomerbyName('Customer1',"LastName1");
  //   console.log(getcname);
  //   let getc=await FactoryLogic.CustomerController().getLCustomer(5);
  //   console.log(getc);
  //     let getcs=await FactoryLogic.CustomerController().getLCustomers();
  //   console.log(getcs);
    // let getCustomerbyExpresion=await FactoryLogic.CustomerController().getCustomerbyExpresion("");
    // console.log(getCustomerbyExpresion);

//  }
// customermaintenace().then(

// )


// ***********************  CATEGORY MAINTENANCE ************************* */

// let dtocat=new DTOCategory("Category","Description");

// let categorymaintenance=async()=>
// {
   // UPDATE CATEGORY

    // let getcs=await FactoryLogic.CategoryController().listCategories();
    // console.log(getcs);

    // let getselect= await FactoryLogic.CategoryController().selectCategory("Category");
    // console.log(getselect);

    // let upcategory=  await FactoryLogic.CategoryController().updateCategory("Descriptionone");
    // console.log(upcategory);

    // REGISTER CATEGORY

    // let addc=await FactoryLogic.CategoryController().registerCategory(dtocat);
    // console.log(addc);

    // GETS

  //  let getcates=await FactoryLogic.CategoryController().getLSortCategories();
  //   console.log(getcates);
  //   let getcname=await FactoryLogic.CategoryController().getLCategories();
  //   console.log(getcname);
  //   let getc=await FactoryLogic.CategoryController().getLCategory("Category1");
  //   console.log(getc);

//  }
//  categorymaintenance().then(

// )

// //*********************** DISH MAINTENANCE ************************ */


// let dtodish=new DTODish(86,"Dish","Category2","Description","img.jpg",8,[],10,20);
// let dtodishingredient1=new DTODishC(86,"Ingredient1",2,3);
// let dtodishingredient2=new DTODishC(86,"Ingredient2",4,2);
// let dtodishingredient3=new DTODishC(86,"Ingredient3",3,1);

// let dishmaintenance=async()=>
// {
   // // REGISTER DISH
    
  //  let enterdd=await FactoryLogic.DishController().enterDataDish(dtodish);
  //  console.log(enterdd);

  //   let registeri1=await FactoryLogic.DishController().registerDIngredient(dtodishingredient1);
  //   console.log(registeri1);

  //   let registeri2=await FactoryLogic.DishController().registerDIngredient(dtodishingredient2);
  //   console.log(registeri2);

  //   // let removei=await FactoryLogic.DishController().removeDIngredient(1);
  //   // console.log(removei);

  //   let registeri3=await FactoryLogic.DishController().registerDIngredient(dtodishingredient3);
  //   console.log(registeri3);

  //   let savedish= await FactoryLogic.DishController().saveDishDB(15);
  //   console.log(savedish);

    // // UPDATE DISH

  //   let listDishes=await FactoryLogic.DishController().getDishes();
  //  console.log(listDishes);

  //   let selectDish=await FactoryLogic.DishController().selectDish(1);
  //   console.log(selectDish);

  //   let updateDish=await FactoryLogic.DishController().updateDish(dtodish);
  //   console.log(updateDish);

   // // GET DISH

  //   let getDish=await FactoryLogic.DishController().getDish(1);
  //  console.log(getDish);
  
  //   let searchLDishCategory=await FactoryLogic.DishController().searchLDishCategory("Category1");
  //  console.log(searchLDishCategory);
  

  //   let sortDishbyName=await FactoryLogic.DishController().sortDishbyName();
  //  console.log(sortDishbyName);
  
  //   let sortbyDishCategoryName=await FactoryLogic.DishController().sortbyDishCategoryName();
  //  console.log(sortbyDishCategoryName);

  //   let sortbyDishPriceAscending=await FactoryLogic.DishController().sortbyDishPriceAscending();
  //  console.log(sortbyDishPriceAscending);
    
  //   let sortbyDishPriceDescending=await FactoryLogic.DishController().sortbyDishPriceDescending();
  //  console.log(sortbyDishPriceDescending);

  //  let sortbyCost=await FactoryLogic.DishController().sortbyCost();
  //  console.log(sortbyCost);

  //  let sortbyQuantity=await FactoryLogic.DishController().sortbyQuantity();
  //  console.log(sortbyQuantity);

  //  let getDishes=await FactoryLogic.DishController().getDishes();
  //  console.log(getDishes);

  // //*******************  INGREDIENTS ***************************

  //    let listDishesI=await FactoryLogic.DishController().listDishesI();
  //  console.log(listDishesI);

  //   let selectDishI=await FactoryLogic.DishController().selectDishI(1);
  //   console.log(selectDishI);

  //    // UPDATE

  //   let selectIngredient=await FactoryLogic.DishController().selectIngredient(0);
  //   console.log(selectIngredient);
 
  //    let updateIngredient=await FactoryLogic.DishController().updateIngredient(
  //      new DTODishC(0,"Ingredientupdate",5,4));
  //    console.log(updateIngredient);

  //    let updateCost=await FactoryLogic.DishController().updateCost();
  //    console.log(updateCost);

  //    let updateDishI=await FactoryLogic.DishController().updateDishI();
  //    console.log(updateDishI);

   //   // REGISTER

    //  let registerIngredient=await FactoryLogic.DishController().registerIngredient(new DTODishC(
    //    0,"Ingredientadded",6,5));
  
    // console.log(registerIngredient);

  //  // REGISTER QUANTITY

  //  let listDishes=await FactoryLogic.DishController().getDishes();
  //  console.log(listDishes);

  //   let selectDish=await FactoryLogic.DishController().selectDish(1);
  //   console.log(selectDish);

  //    let addQuantity=await FactoryLogic.DishController().addQuantity(5);
  //   console.log(addQuantity);

//  }
//  dishmaintenance().then()

// ************************** TABLES MAINTENANCE ******************* */

// let tablemaintenance=async()=>
// {

   // REGISTER TABLE

    // let regtable=await FactoryLogic.TableController().registerTable();
    // console.log(regtable);

    // UPDATE TABLE

  //  let getLAvailableTables=await FactoryLogic.TableController().getLAvailableTables();
  //   console.log(getLAvailableTables);

    // let listBusyTables=await FactoryLogic.TableController().listBusyTables();
    // console.log(listBusyTables);

    // let selectTable=await FactoryLogic.TableController().selectTable(2);
    // console.log(selectTable);

    // let enableTable=await FactoryLogic.TableController().enableTable();
    // console.log(enableTable);

    // let disableTable=await FactoryLogic.TableController().disableTable();
    // console.log(disableTable);


    // GETS

  //  let getLAvailableTables=await FactoryLogic.TableController().getLAvailableTables();
  //   console.log(getLAvailableTables);
  //   let getLBusyTables=await FactoryLogic.TableController().getLBusyTables();
  //   console.log(getLBusyTables);
  //   let getLTable=await FactoryLogic.TableController().getLTable(1);
  //   console.log(getLTable);
  //    let getLTables=await FactoryLogic.TableController().getLTables();
  //   console.log(getLTables);

//  }
//  tablemaintenance().then()

// // ***************************** TABLE_CUSTOMER ************* */

// let tablecustomermaintenance=async()=>
// {
  
 //  let dtcustomer=new DTOCustomer(0,"Customer10","LastName15");

  //********* ADD WITHOUT PREVIOUS RESERVATION ******* */

  //  let registerCustomer=await FactoryLogic.TableCustomerController().registerCustomer(dtcustomer);
  //  console.log(registerCustomer);

  //********* ADD WITH PREVIOUS RESERVATION ********** */

  //  let getCustomerbyExpresion=await FactoryLogic.TableCustomerController().getCustomerbyExpresion();
  //  console.log(getCustomerbyExpresion);

  //  let enterCustomer=await FactoryLogic.TableCustomerController().enterCustomer(7);
  //  console.log(enterCustomer);
   
  //  let listAvailableTable=await FactoryLogic.TableCustomerController().listAvailableTable();
  //  console.log(listAvailableTable);

  //  let enterTable=await FactoryLogic.TableCustomerController().enterTable(6);
  //  console.log(enterTable);

  //  let registerTableCustomer=await FactoryLogic.TableCustomerController().registerTableCustomer();
  //  console.log(registerTableCustomer);
  
  //********** DELETE **************** */

  //  let getLTablesCustomers=await FactoryLogic.TableCustomerController().getLTablesCustomers();
  //  console.log(getLTablesCustomers);
  //   let selectTableCustomer=await FactoryLogic.TableCustomerController().selectTableCustomer(1);
  //  console.log(selectTableCustomer);
  //   let deleteTableCustomer=await FactoryLogic.TableCustomerController().deleteTableCustomer();
  //  console.log(deleteTableCustomer);

  //********* GETS ******************** */

  //  let getLSortbyTable=await FactoryLogic.TableCustomerController().getLSortbyTable();
  //  console.log(getLSortbyTable);
  //  let getLSortbyCustomer=await FactoryLogic.TableCustomerController().getLSortbyCustomer();
  //  console.log(getLSortbyCustomer);
  //  let getLTablesCustomers=await FactoryLogic.TableCustomerController().getLTablesCustomers();
  //  console.log(getLTablesCustomers);

  
  //  let getLTableC=await FactoryLogic.TableCustomerController().getLTableC(2);
  //  console.log(getLTableC);
  //  let getLTCbyCustomer=await FactoryLogic.TableCustomerController().getLTCbyCustomer("","LastName5");
  //  console.log(getLTCbyCustomer);
  //  let getLTCbyTable=await FactoryLogic.TableCustomerController().getLTCbyTable(1);
  //  console.log(getLTCbyTable);
// }
// tablecustomermaintenance().then()

// // ***************************** ORDER ********************************** */



























// // *********************************************************** */
// ADD MANY CUSTOMER

// let dtcustomer1=new DTOCustomer(0,"Customer1","LastName1");
// let dtcustomer2=new DTOCustomer(0,"Customer2","LastName2");
// let dtcustomer3=new DTOCustomer(0,"Customer3","LastName3");
// let dtcustomer4=new DTOCustomer(0,"Customer4","LastName4");
// let dtcustomer5=new DTOCustomer(0,"Customer5","LastName5");
// let dtcustomer6=new DTOCustomer(0,"Customer6","LastName6");
// let dtcustomer7=new DTOCustomer(0,"Customer7","LastName7");
// let dtcustomer8=new DTOCustomer(0,"Customer8","LastName8");

// let arraycustomer=[];
// arraycustomer.push(dtcustomer1);
// arraycustomer.push(dtcustomer2);
// arraycustomer.push(dtcustomer3);
// arraycustomer.push(dtcustomer4);
// arraycustomer.push(dtcustomer5);
// arraycustomer.push(dtcustomer6);
// arraycustomer.push(dtcustomer7);
// arraycustomer.push(dtcustomer8);


// let addmanycustomer=async()=>
// {
//   for(let cust of arraycustomer)
//   {
//     let addcust=await FactoryLogic.CustomerController().registerCustomer(cust);
//     console.log(addcust);
//   }
// }

// addmanycustomer().then(

// )

// //****************************************************************** */

// //ADD MANY USERS

// let dtuser2=new DTOUser("789678987","User2","City2","Administrator","","User123456");

// let dtuser3=new DTOUser("24564654645","User3","City3","Chef","","User123456");

// let dtuser4=new DTOUser("345678678","User4","City4","Waiter","","User123456");

// let dtuser5=new DTOUser("65467896879","User5","City5","Cashier","","User123456");

// let dtuser6=new DTOUser("789264565","User6","City6","Chef","","User123456");

// let dtuser7=new DTOUser("4564564566","User7","City7","Waiter","","User123456");

// let arrayuser=[];
// arrayuser.push(dtuser2);
// arrayuser.push(dtuser3);
// arrayuser.push(dtuser4);
// arrayuser.push(dtuser5);
// arrayuser.push(dtuser6);
// arrayuser.push(dtuser7);

// let addmanyuser=async()=>
// {
//   for(let user of arrayuser)
//   {
//     let addp=await FactoryLogic.UserController().registerUser(user);
//     console.log(addp);
//   }
// }

// addmanyuser().then()

// // //******************************************************************************** */

// //ADD MANY CATEGORIES

// let dtocat1=new DTOCategory("Category1","Description1");
// let dtocat2=new DTOCategory("Category2","Description2");
// let dtocat3=new DTOCategory("Category3","Description3");
// let dtocat4=new DTOCategory("Category4","Description4");
// let dtocat5=new DTOCategory("Category5","Description5");
// let dtocat6=new DTOCategory("Category6","Description6");
// let dtocat7=new DTOCategory("Category7","Description7");

//  let arrays=[];

//  arrays.push(dtocat1);
//  arrays.push(dtocat2);
//  arrays.push(dtocat3);
//  arrays.push(dtocat4);
//  arrays.push(dtocat5);
//  arrays.push(dtocat6);
//  arrays.push(dtocat7);

//   let addmanycategory=async()=>
//         {
//      for(let cat of arrays)
//        {
//          let addr=await FactoryLogic.CategoryController().registerCategory(cat);
//          console.log(addr);
//        }
//      }

//    addmanycategory().then(

//   )

//  //**************************************************** */

// //ADD MANY TABLE

//   let addmanytable=async()=>
//         {
//      for(let i=1; i<=10; i++)
//        {
//          let addr=await FactoryLogic.TableController().registerTable();
//          console.log(addr);
//        }
//      }

//      addmanytable().then(

//   )
 

