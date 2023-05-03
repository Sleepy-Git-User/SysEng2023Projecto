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

module.exports = {Database};