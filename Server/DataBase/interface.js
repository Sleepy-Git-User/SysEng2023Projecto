//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");


//Creates the Database class
const Database = new DataBaseSystem("Database", DbPath);
try {
  //Imports the DDL
  Database.importDDL(DDLPath);
} catch (error) {
  console.log(error);
}

//Login Page
function loginChecker(UserID){

}

//Admin Page
function makeUser(Fname,Lname){
const user_id = Database.generateUUID("User","UserID")
console.log(user_id);
}

function removeUser(UserID){

}

function toggleAdmin(UserID){

}

function getUserDetails(UserID){

}


module.exports = {Database};

console.log(makeUser("Luke","Smith"));