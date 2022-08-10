USE restaurantt
go

---------------------------------------------
----TABLES

CREATE TABLE Users(
	IDCardU varchar(20) NOT NULL PRIMARY KEY ,
	NamesUserU varchar(50) NOT NULL,
	CityU varchar(20) NOT NULL,
	TypeUserU varchar(20) NOT NULL,
	HashhU varchar(1000) not null,
	PasswordUserU varchar(1000) not null,
) 
go

CREATE TABLE Customer(
	IDCustomer int PRIMARY KEY Identity(1,1),
	NamesC varchar(20) NOT NULL,
	LastNameC varchar(20) NOT NULL,
	PhoneNumberC varchar(20) NOT NULL
) 
go

CREATE TABLE Category(
	IDCategory int PRIMARY KEY Identity(1,1),
	NameC varchar(50) NOT NULL,
	DescriptionC varchar(100) NOT NULL,
) 
go
CREATE TABLE Dish(
	IDDishh int NOT NULL PRIMARY KEY Identity(1,1) ,
	NameD varchar(50) NOT NULL,
	IDCategory int not null Foreign Key References Category(IDCategory),
	DescriptionD varchar(100) NOT NULL,
	ImgD varchar(100) NOT NULL,
	PriceD money not null,
	CostD money not null,
	QuantityAD int not null,
) 
go

CREATE TABLE Ingredient(
	IDIngredientt int NOT NULL PRIMARY KEY Identity(1,1),
	IDDishh int not null Foreign Key References Dish(IDDishh),
	NameI varchar(100) NOT NULL,
	CostI money NOT NULL,
	QuantityI int not null,	
	
) 
go

CREATE TABLE TablesR(
	IDTable int NOT NULL PRIMARY KEY Identity(1,1),
	StateT varchar(20) NOT NULL,
	NumberPeopleT int NOT NULL,
) 
go
CREATE TABLE Table_Customer(
	IDTableC int NOT NULL PRIMARY KEY Identity(1,1),
	IDTable int not null Foreign Key References TablesR(IDTable),
	IDCustomer int not null Foreign Key References Customer(IDCustomer),
) 
go
CREATE TABLE Orderr(
	IDOrder int NOT NULL PRIMARY KEY Identity(1,1),
	DateO datetime NOT NULL,
	StateO varchar(20) NOT NULL,
	SpecialRequirement varchar(500) NOT NULL,
	NumberPeople int NOT NULL,
	IDCustomer int not null Foreign Key References Customer(IDCustomer),
) 
go
CREATE TABLE DetailOrder(
	IDDetailO int NOT NULL PRIMARY KEY Identity(1,1) ,
	QuantityDO int NOT NULL,
	AmountDO money NOT NULL,
	IDOrder int not null Foreign Key References Orderr(IDOrder),
	IDDishh int not null Foreign Key References Dish(IDDishh),

) 
go
CREATE TABLE Bill(
	IDBilll int NOT NULL PRIMARY KEY Identity(1,1),
	DateB date not null,
	SubtotalB money NOT NULL,
	TotalB money NOT NULL,
	VATB money NOT NULL,
	StateB varchar(20) not null,
	IDOrder int not null Foreign Key References Orderr(IDOrder),
) 
go




--drop table Bill
--drop table DetailOrder
--drop table Orderr
--drop table Table_Customer
--drop table TablesR
--drop table Ingredient
--drop table Dish
--drop table Category
--drop table Customer
--drop table Users


  select * from Category
  select * from Dish
  select * from TablesR
  select * from Ingredient
  select * from Customer
  select * from Table_Customer
  select * from TablesR
  select * from Orderr
  select *  from DetailOrder
  select * from Dish
  select *  from Bill
   
   update dish set quantityad=30 

   select sum(quantitydo) as   from detailorder where idorder=

      
               UPDATE d SET d.QuantityAD=d.QuantityAD-do.QuantityDO
               FROM 
               Bill b INNER JOIN Orderr o ON o.IDOrder=b.IDOrder
               INNER JOIN  DetailOrder do ON do.IDOrder=o.IDOrder 
               INNER JOIN Dish d ON d.IDDishh=do.IDDishh 
               WHERE b.IDBilll=3
