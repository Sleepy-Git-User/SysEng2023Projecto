//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const generateUniqueCode = require("../utili/UniqueCode.js");

module.exports=(dbName = "Database")=>{

  //Creates the Database class
  const Database = new DataBaseSystem(dbName, DbPath);
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
  
  function genID(table, value){
    let product_id = generateUniqueCode();
    while(Database.inTable(table,value,product_id)){
      product_id=generateUniqueCode()
    }
    return product_id;
  }
  
  function addProduct(name,description,price,stock,category){
    if(Database.inTable("Products","Name",name.toUpperCase())) return false;
    let product_id = generateUniqueCode();
    while(Database.inTable("Products","ProductID",product_id)){
      product_id=generateUniqueCode()
    }
    const insertProduct = Database.database.prepare('INSERT INTO Products (ProductID, Name, Description, Price, Stock, Category) VALUES (?,?,?,?,?,?)');
    insertProduct.run(product_id,name.toUpperCase(),description,price,stock,category);
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
    const sql = Database.database.prepare(`SELECT Products.*, IFNULL(ROUND(Products.Price*Discounts.Amount,2),Products.Price) DiscountPrice FROM Products LEFT JOIN Discounts ON Discounts.ProductID = Products.ProductID AND Discounts.StartDateTime < DATE('now') AND Discounts.EndDateTime > DATE('now')`);
    return sql.all();
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
  //editProductName("72645439","Lock bottle");
  
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
  return true
  }
  //makeDiscount Test
  //makeDiscount("81204913","2023-05-01T23:59:59","2023-06-30T23:59:59","0.5");
  
  function deleteDiscount(DiscountID){
    Database.deleteRecord("Discounts","DiscountID",DiscountID)
    return true
  }
  //delteDiscount Test
  //deleteDiscount("80525205");
  
  function getAllDiscountDetails(){
    return Database.getAllRecords("Discounts");
  }
  //getAllDiscountDetails
  //console.log(getAllDiscountDetails());
  
  function newSale(salesData){
    // Add to sales:
    const SaleID = genID("Sales", "SaleID");
    const sql = Database.database.prepare(`INSERT INTO Sales VALUES(?,?,?)`);
    sql.run(SaleID,salesData.DateTime, salesData.total);
  
    // Sales Items:
    salesData.sales.forEach(sale => {
      insertSale(sale);
    });
  
    function insertSale(sale){
      const SalesItemID =genID("SaleItems", "SaleItemID");
      const sql = Database.database.prepare(`INSERT INTO SaleItems VALUES(?,?,?,?,?)`);
      sql.run(SalesItemID, SaleID, sale.productID, sale.quantity, sale.price)
    }
  
    // Payments:
    const PaymentID = genID("Payments","PaymentID");
    const sql2 = Database.database.prepare(`INSERT INTO Payments VALUES(?,?,?,?)`);
    sql2.run(PaymentID, SaleID, salesData.total, salesData.payType)
  
  }
  return{
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
    getAllDiscountDetails,
    newSale
  };

}