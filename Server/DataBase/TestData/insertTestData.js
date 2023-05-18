const fs = require("fs");
const { EOL, userInfo } = require("os");
const path = require("path");
const { Interface } = require("readline");
const UserData = path.join(__dirname, "/userData.csv");
const ProductData = path.join(__dirname, "/ProductData.csv");
const interface = require("../interface.js");
const database = interface.Database;

function importData(path) {
  let data = fs.readFileSync(path, "utf-8");
  let splitData = data.split("\r\n");

  for (let i = 0; i < splitData.length; i++) {
    let splitLine = splitData[i].split(",");

    if (path === UserData) {
      interface.makeUser(
        splitLine[0],
        splitLine[1]
      );
    } else {
        interface.addProduct(
            splitLine[0],
            splitLine[1],
            splitLine[2],
            splitLine[3],
            splitLine[4]
        )
  }
}
}

importData(UserData);
importData(ProductData);
