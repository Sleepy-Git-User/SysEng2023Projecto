//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const generateUniqueCode = require("../utili/UniqueCode.js");

//Creates the Database class
const Database = new DataBaseSystem("Database", DbPath);
const { log } = require("console");
try {
  //Imports the DDL
  Database.importDDL(DDLPath);
} catch (error) {
  console.log(error);
}

//Login Page
function loginChecker(UserID){
return Database.inTable("User","UserID",UserID);
}
//loginChecker
//console.log(loginChecker("00668553"));

//Admin Page
function makeUser(Fname,Lname){
let user_id = generateUniqueCode();
while(Database.inTable("User","UserID",user_id)){
  user_id=generateUniqueCode()
}
const insertUser = Database.database.prepare('INSERT INTO User (UserID, Fname, Lname) VALUES (?,?,?)');
insertUser.run(user_id,Fname,Lname);
}
//makeUser Test
//makeUser("John","Doe");


function removeUser(UserID){
Database.deleteRecord("User","UserID",UserID);
}
//removeUser Test
//removeUser("22515073")

function toggleAdmin(UserID){
userDetails = getUserDetails(UserID);
if (userDetails[0].Admin_Status == 0){
  Database.updateRecord("User","Admin_Status",1,"UserID",UserID); 
}else{
  Database.updateRecord("User","Admin_Status",0,"UserID",UserID);
}
}
//toggleAdmin Test
//toggleAdmin("00668553");

function editFname(UserID,Fname){
  Database.updateRecord("User","Fname",Fname,"UserID",UserID);
}
function editLname(UserID,Lname){
  Database.updateRecord("User","Lname",Lname,"UserID",UserID);
}

//editFname + editLname Test
//editFname("00668553","God");
//editLname("33249462","Nixon");

function getUserDetails(userID){
return Database.getRecord("User","UserID",userID)
}
//getUserDetails Test
//console.log(getUserDetails("33249462"));

function getAllUserDetails(){
  return Database.getAllRecords("User")
}

//getAllUserDetails Test
//console.log(getAllUserDetails());

function addProduct(name,description,price,stock){
  if(Database.inTable("Products","Name",name.toUpperCase())) return false;
  let product_id = generateUniqueCode();
  while(Database.inTable("Products","ProductID",product_id)){
    product_id=generateUniqueCode()
  }
  const insertProduct = Database.database.prepare('INSERT INTO Products (ProductID, Name, Description, Price, Stock) VALUES (?,?,?,?,?)');
  insertProduct.run(product_id,name.toUpperCase(),description,price,stock);
  return true;
}

//addProduct Test
//addProduct("Watch","An Orange Thing",1300.30,1023);


function removeProduct(ProductID){
  Database.deleteRecord("Products","ProductID",ProductID);
}

//removeProduct Test
//removeProduct("9039461");

function getAllProductDetails(){
  return Database.getAllRecords("Products")
}

//getAllProductDetails Test
//console.log(getAllProductDetails());

function getSingleProductDetails(ProductID){
  return Database.getRecord("Products","ProductID",ProductID)
}

//getSingleProductDetails Test
//console.log(getSingleProductDetails("6955663"));

function getAllProdcutIDsAndNames(){
  const sql = Database.database.prepare('SELECT ProductID, Name FROM Products');
  return sql.all();
}
//getAllProductIDsAndNames Test
//console.log(getAllProdcutIDsAndNames())

function editProductName(ProductID, Value){
  if(Database.inTable("Products","Name",Value.toUpperCase())) return false;
  Database.updateRecord("Products","Name",Value.toUpperCase(),"ProductID",ProductID);
}
function editProductDescription(ProductID, Value){
  Database.updateRecord("Products","Description",Value,"ProductID",ProductID);
}
function editProductPrice(ProductID, Value){
  Database.updateRecord("Products","Price",Value,"ProductID",ProductID);
}
function editProductStock(ProductID, Value){
  Database.updateRecord("Products","Stock",Value,"ProductID",ProductID);
}
//editProductName etc Test
editProductName("72645439","Cock bottle");

function makeDiscount(ProductID,Start,End,Amount){
  if(Database.inTable("Discounts","ProductID",ProductID)){
    const sql = Database.database.prepare('SELECT * FROM Discounts WHERE ProductID = ? AND EndDateTime > ?');
  if (sql.all(ProductID,Start).length > 0)return false
  }
let discount_id = generateUniqueCode();
while(Database.inTable("Discounts","DiscountID",discount_id)){
  discount_id=generateUniqueCode()
}
const insertDiscount = Database.database.prepare('INSERT INTO Discounts (DiscountID, ProductID, StartDateTime, EndDateTime, Amount) VALUES (?,?,?,?,?)');
insertDiscount.run(discount_id,ProductID,Start,End,Amount);
}
//makeDiscount Test
//makeDiscount("34959456","2023-07-01T23:59:59","2023-06-30T23:59:59",50.00);

function deleteDiscount(DiscountID){
  Database.deleteRecord("Discounts","DiscountID",DiscountID)
}
//delteDiscount Test
//deleteDiscount("80525205");

function getAllDiscountDetails(){
  return Database.getAllRecords("Discounts");
}
//getAllDiscountDetails
//console.log(getAllDiscountDetails());

module.exports = {
  Database,
  loginChecker,
  makeUser,
  removeUser,
  toggleAdmin,
  editFname,
  editLname,
  getUserDetails,
  addProduct,
  removeProduct,
  getAllProductDetails,
  getSingleProductDetails,
  getAllUserDetails,
  getAllProdcutIDsAndNames,
  editProductName,
  editProductDescription,
  editProductPrice,
  editProductStock,
  deleteDiscount,
  makeDiscount,
  getAllDiscountDetails
};