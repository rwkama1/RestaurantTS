
const {FactoryLogic}=require("./Restaurant/dist/logic/FactoryLogic");
const { default: DTOCategory } = require("./Restaurant/dist/shared/entity/DTOCategory");
const { default: DTOCustomer } = require("./Restaurant/dist/shared/entity/DTOCustomer");
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

// **************************** CUSTOMER MAINTENANCE ********************************** */


// let dtcustomer=new DTOCustomer("6446789797","Customer1","LastName1"
// ,"Town1","Address1","4678987987","mail1customer@gmail.com","","Customer12345");

// let customermaintenace=async()=>
// {
//    // UPDATE CUSTOMER

//     // let getcs=await FactoryLogic.CustomerController().listCustomers();
//     // console.log(getcs);
//     // let getcname=await FactoryLogic.CustomerController().getCustomersbyName('Customer1',"LastName1");
//     // console.log(getcname);
//     // let getselect= await FactoryLogic.CustomerController().selectCustomer("6446789797");
//     // console.log(getselect);
//     // let updcustomer=  await FactoryLogic.CustomerController().updateCustomer(dtcustomer);
//     // console.log(updcustomer);

//     // REGISTER CUSTOMER

//     // let addc=await FactoryLogic.CustomerController().registerCustomer(dtcustomer);
//     // console.log(addc);

//     // AUTENTICACTION

//     // let login=await FactoryLogic.CustomerController().loginCustomer("784564566","Customer12345");
//     // console.log(login);
//     // let customerlogin= FactoryLogic.CustomerController().getloginCustomer();
//     // console.log(customerlogin);
//     // let logout= FactoryLogic.CustomerController().logout();
//     // console.log(logout);
//     // let customerlogin2= FactoryLogic.CustomerController().getloginCustomer();
//     // console.log(customerlogin2);

//     // GETS

//     //  let getscust=await FactoryLogic.CustomerController().getLSortCustomers();
//     // console.log(getscust);
//     // let getcname=await FactoryLogic.CustomerController().getCustomersbyName('Customer1',"LastName1");
//     // console.log(getcname);
//     // let getc=await FactoryLogic.CustomerController().getLCustomer("784564566");
//     // console.log(getc);
//     //   let getcs=await FactoryLogic.CustomerController().getLCustomers();
//     // console.log(getcs);

//  }
// customermaintenace().then(

// )


// ***********************  CATEGORY MAINTENANCE ************************* */

let dtocat=new DTOCategory("Category","Description");

let categorymaintenance=async()=>
{
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

 }
 categorymaintenance().then(

)

// *********************** SERVICE MAINTENANCE ************************ */

// FactoryLogic.ServiceController().registerService(dtoservice).then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().updateService(dtoservice).then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().disableService(dtoservice).then(data => {
//   console.log(data);
// });
// FactoryLogic.ServiceController().getServices().then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().getService(1).then(data => {
//   console.log(data);
// });

// ************************** RESERVATION MAINTENANCE ******************* */

//  HOTEL

// let registerReservation=async()=>
// {
//     let enterp=await FactoryLogic.ReservationController().enterPassenger("456456546");
//     console.log(enterp);
//     if(enterp===false)
//     {
//     let p=await FactoryLogic.ReservationController().registerPassenger(dtpassenger);
//      console.log(p);
//     }
//     let listreservation= await FactoryLogic.RoomController().getLActiveSortRooms();
//     console.log(listreservation);

//     let regdetailr=await FactoryLogic.ReservationController().registerReservationDetail(7);
//     console.log(regdetailr);
//     // let regdetailr1=await FactoryLogic.ReservationController().registerReservationDetail(2);
//     // console.log(regdetailr1);
//     // let regdetailr6=await FactoryLogic.ReservationController().removeReservationDetail(3);
//     // console.log(regdetailr6);

//     let closer=await FactoryLogic.ReservationController().closeReservation(dtoreservation);
//     console.log(closer);

//     let saver=await FactoryLogic.ReservationController().saveReservation();
//     console.log(saver);


// }

// registerReservation().then(

// )


//  ONLINE


// let registerReservation=async()=>
// {
//     let start=await FactoryLogic.ReservationController().startReservation();
//     console.log(start);


//     let regdetailr=await FactoryLogic.ReservationController().registerOnlineReservationDetail(4);
//     console.log(regdetailr);

//     let objreservation= FactoryLogic.ReservationController().getReservationinProgress();
//     console.log(objreservation);
//     // let regdetailr1=await FactoryLogic.ReservationController().registerOnlineReservationDetail(2);
//     // console.log(regdetailr1);
//     // let regdetailr2=await FactoryLogic.ReservationController().registerOnlineReservationDetail(3);
//     // console.log(regdetailr2);
//     // let regdetailr6=await FactoryLogic.ReservationController().removeOnlineReservationDetail(3);
//     // console.log(regdetailr6);
//     let login=await FactoryLogic.PassengerController().loginPassenger("7898764","Passenger123");
//     console.log(login);
//     dtoreservation.idcardpassenger=login.idcard;
//     let closer=await FactoryLogic.ReservationController().closeOnlineReservation(dtoreservation);
//     console.log(closer);

//     let saver=await FactoryLogic.ReservationController().saveOnlineReservation();

//     console.log(saver);


// }

// registerReservation().then(

// )


// MAINTENANCE


// let removeRoomReservation=async()=>
// {
//       let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//     let getr=await FactoryLogic.ReservationController().getReservation(1);
//   console.log(getr);
//   let removerroom=await FactoryLogic.ReservationController().removeReservationRoom(getr.numberreservation,2);
//   console.log(removerroom)

// }

// removeRoomReservation().then(

// )


// let canceledr=async()=>
// {
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//   let getr=await FactoryLogic.ReservationController().getReservation(1);
//   console.log(getr);
//   let canceledr=await FactoryLogic.ReservationController().cancelReservation(getr.numberreservation);
//   console.log(canceledr);

// }
// canceledr().then(

// );
// let confirmr=async()=>
// {
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//   let getr=await FactoryLogic.ReservationController().getReservation(2);
//   console.log(getr);

//   let confirmr=await FactoryLogic.ReservationController().confirmReservation(getr.numberreservation);
//   console.log(confirmr);

// }
// confirmr().then(

// );

// let addroomreservation=async()=>
// {
//   dtoreservation.listDetailReservation.push(new DTOReservationDetail(0,50,5));
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//   console.log(getp);

//   let getadd=await FactoryLogic.ReservationController().addReservationDetail(5,2);
//   console.log(getadd);

// }

// addroomreservation().then(

// )

// let getPendingPassenger=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getLPendingPassenger("7898764");
//   console.log(getppr);

// }


// getPendingPassenger().then(

// )

// let getReservationbyDates=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getLRbyDate(new Date("September 16, 2021"),new Date("December 7, 2021"));
//   console.log(getppr);

// }

// getReservationbyDates().then(

// )

// let getReservationbyroom=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getByRoom(2);
//   console.log(getppr);

// }

// getReservationbyroom().then(

// )
// // **************************** PASSENGER SERVICES MAINTENANCE  ******************************************* */

// let addservicepassanger=async()=>
// {

//   let sps=await FactoryLogic.PassengerServiceController().startPS();
//   console.log(sps);
//   let rdps=await FactoryLogic.PassengerServiceController().registerDPS(1);
//   console.log(rdps);
//   let rdps2=await FactoryLogic.PassengerServiceController().registerDPS(5);
//   console.log(rdps2);
//   let rmdps2=await FactoryLogic.PassengerServiceController().removeDPS(5);
//   console.log(rmdps2);
//   let closeps=await FactoryLogic.PassengerServiceController().closePS(dtopassengerservice);
//   console.log(closeps);
//   let saveps=await FactoryLogic.PassengerServiceController().savePS();
//   console.log(saveps);

// }
// addservicepassanger().then(

// )

// let addnewservice=async()=>
// {


//   dtopassengerservice.listdetailps.push(new DTODPassengerService(0,6,200));
//     let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//   console.log(getpname);

//   let getp=await FactoryLogic.PassengerServiceController().enterPassenger(getpname.idcard);
//   console.log(getp);
//   let addps=await FactoryLogic.PassengerServiceController().addDPS(dtopassengerservice);
//   console.log(addps);

// }
// addnewservice().then(

// )
// let getPassengerService=async()=>
// {

//      let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//     console.log(getpname);
//       let getspr=await FactoryLogic.PassengerServiceController().getPSbyPassenger(getpname.idcard);
//   console.log(getspr);
//     let getps=await FactoryLogic.PassengerServiceController().getPS(getspr.numberps);
//    console.log(getps);

// }
// getPassengerService().then(

// )

// ********************************** PAYMENT MAINTENANCE ******************************* */

// let registerPayment=async()=>
// {

//   let datepay=new Date("October 20, 2021");
//      let getreservations=await FactoryLogic.PaymentController().enterPassenger("456456546");
//     console.log(getreservations);
//     let getres=await FactoryLogic.PaymentController().enterReservationsService(1);
//     console.log(getres);
//       let getclosep=await FactoryLogic.PaymentController().closePayment(200,datepay);
//     console.log(getclosep);
//     let result=await FactoryLogic.PaymentController().savePayment();
//    console.log(result);

// }
// registerPayment().then(

// )


// let getPayment=async()=>
// {

//        let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//     console.log(getpname);
//       let getpay=await FactoryLogic.PaymentController().getLPaymentPassenger(getpname.idcard);
//     console.log(getpay);


// }
// getPayment().then(

// )











// // *************************************************************************** */

// // ADD MANY CUSTOMER

// let dtcustomer1=new DTOCustomer("784564566","Customer2","LastName2"
// ,"Town2","Address2","0945645654","mail2customer@gmail.com","","Customer12345");
// let dtcustomer2=new DTOCustomer("789456456","Customer3","LastName3"
// ,"Town3","Address3","0978546456","mail3customer@gmail.com","","Customer12345");
// let dtcustomer3=new DTOCustomer("456789789","Customer4","LastName4"
// ,"Town4","Address4","09784564456","mail4customer@gmail.com","","Customer12345");
// let dtcustomer4=new DTOCustomer("453645677","Customer5","LastName5"
// ,"Town5","Address5","07545645456","mail5customer@gmail.com","","Customer12345");
// let dtcustomer5=new DTOCustomer("2564897897","Customer6","LastName6"
// ,"Town6","Address6","07945645656","mail6customer@gmail.com","","Customer12345");
// let dtcustomer6=new DTOCustomer("754564685","Customer7","LastName7"
// ,"Town7","Address7","078546456","mail7customer@gmail.com","","Customer12345");
// let dtcustomer7=new DTOCustomer("165468797","Customer8","LastName8"
// ,"Town8","Address8","0954564564","mail8customer@gmail.com","","Customer12345");
// let dtcustomer8=new DTOCustomer("564645647","Customer9","LastName9"
// ,"Town9","Address9","0345645678","mail9customer@gmail.com","","Customer12345");

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

// //******************************************************************************** */

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

