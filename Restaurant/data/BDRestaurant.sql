USE BDRestaurant
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
) 
go

CREATE TABLE Category(
	NameC varchar(50) NOT NULL PRIMARY KEY,
	DescriptionC varchar(100) NOT NULL,
) 
go
CREATE TABLE Dish(
	IDD int NOT NULL PRIMARY KEY ,
	NameD varchar(50) NOT NULL,
	NameC varchar(50) not null Foreign Key References Category(NameC),
	DescriptionD varchar(100) NOT NULL,
	ImgD varchar(100) NOT NULL,
	PriceD money not null,
	CostD money not null,
	QuantityAD int not null,
) 
go

CREATE TABLE Ingredient(
	IDDC int NOT NULL,
	IDDish int not null Foreign Key References Dish(IDD),
	NameI varchar(100) NOT NULL,
	CostI money NOT NULL,
	QuantityI int not null,	
	primary key(IDDC,IDDish)
) 
go

CREATE TABLE TablesR(
	IDT int NOT NULL PRIMARY KEY Identity(1,1),
	StateT varchar(20) NOT NULL,
) 
go
CREATE TABLE Table_Customer(
	IDTC int NOT NULL PRIMARY KEY Identity(1,1),
	IDT int not null Foreign Key References TablesR(IDT),
	IDCustomer int not null Foreign Key References Customer(IDCustomer),
) 
go
CREATE TABLE Orderr(
	IDO int NOT NULL PRIMARY KEY ,
	DateO datetime NOT NULL,
	StateO varchar(20) NOT NULL,
	SpecialRequirement varchar(500) NOT NULL,
	NumberPeople int NOT NULL,
	IDCustomer int not null Foreign Key References Customer(IDCustomer),
) 
go
CREATE TABLE DetailOrder(
	IDDO int NOT NULL ,
	QuantityDO int NOT NULL,
	AmountDO money NOT NULL,
	IDO int not null Foreign Key References Orderr(IDO),
	IDDish int not null Foreign Key References Dish(IDD),
	primary key(IDDO,IDO)
) 
go
CREATE TABLE Bill(
	IDB int NOT NULL PRIMARY KEY Identity(1,1),
	DateB date not null,
	SubtotalB money NOT NULL,
	TotalB money NOT NULL,
	VATB money NOT NULL,
	StateB varchar(20) not null,
	IDOB int not null Foreign Key References Orderr(IDO),
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
--drop table Users
--drop table Customer

