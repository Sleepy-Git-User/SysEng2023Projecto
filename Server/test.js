const Database = require("better-sqlite3");

const interface = require("./DataBase/interface")("TestDataBase");

function run(title,expected,result){
    console.log("Function being tested: "+title);
    console.log("Expected result      : "+expected);
    console.log("Result recieved      : "+result+"\n");
    if (expected == result){
        console.log("Function Passed!\n");
    }else{
        console.log("Function Failed!\n");
    }
}

run("Making a User",true,(()=>{
    interface.makeUser("Liam","Smith")
    const data = interface.getAllUserDetails()
    return interface.Database.inTable("User","UserID",data[0].UserID)
})())

run("Login in as a existing user ",true,(()=>{
    const data = interface.getAllUserDetails()
    return interface.loginChecker(data[0].UserID)
})())

run("Login in as a non existing user ",false,(()=>{
    const data = interface.getAllUserDetails()
    return interface.loginChecker("10204900")
})())

run("Remove a user",false,(()=>{
    const data = interface.getAllUserDetails()
    interface.removeUser(data[0].UserID)
    return interface.Database.inTable("User","UserID",data[0].UserID)
})())

run("Toggle Admin of a User",true,(()=>{
    interface.makeUser("Liam","Smith")
    let data = interface.getAllUserDetails()
    interface.toggleAdmin(data[0].UserID)
    let newData = interface.getAllUserDetails()
    if (newData[0].Admin_Status !== data[0].Admin_Status){
        return true;
    }else{
        return false;
    }
})())

run("Edit User First Name",true,(()=>{
    let data = interface.getAllUserDetails()
    interface.editFname(data[0].UserID,"Dan")
    let newData = interface.getAllUserDetails()
    if (newData[0].Fname !== data[0].Fname){
        return true;
    }else{
        return false;
    }
})())

run("Edit User Last Name",true,(()=>{
    let data = interface.getAllUserDetails()
    interface.editLname(data[0].UserID,"Fridge")
    let newData = interface.getAllUserDetails()
    if (newData[0].Lname !== data[0].Lname){
        return true;
    }else{
        return false;
    }
})())

run("Add Product",true,(()=>{
    return interface.addProduct("Apple","A fresh Apple",1.45,100,"Fruit")
})())

run("Add Existing Product",false,(()=>{
    return interface.addProduct("Apple","A fresh Apple",1.45,100,"Fruit")
})())

run("Remove a Product",false,(()=>{
    const data = interface.getAllUserDetails()
    interface.removeProduct(data[0].UserID)
    return interface.Database.inTable("Products","ProductID",data[0].ProductID)
})())

run("Edit a Products Name",true,(()=>{
    interface.addProduct("Apple","A fresh Apple",1.45,100,"Fruit")
    let data = interface.getAllProductDetails()
    interface.editProductName(data[0].ProductID,"Fridge")
    let newData = interface.getAllProductDetails()
    if (newData[0].Name !== data[0].Name){
        return true;
    }else{
        return false;
    }
})())

run("Edit a Products Description",true,(()=>{
    let data = interface.getAllProductDetails()
    interface.editProductDescription(data[0].ProductID,"A Fridge")
    let newData = interface.getAllProductDetails()
    if (newData[0].Description !== data[0].Description){
        return true;
    }else{
        return false;
    }
})())

run("Edit a Products Price",true,(()=>{
    let data = interface.getAllProductDetails()
    interface.editProductPrice(data[0].ProductID,100)
    let newData = interface.getAllProductDetails()
    if (newData[0].Price !== data[0].Price){
        return true;
    }else{
        return false;
    }
})())

run("Edit a Products Stock",true,(()=>{
    let data = interface.getAllProductDetails()
    interface.editProductStock(data[0].ProductID,15)
    let newData = interface.getAllProductDetails()
    if (newData[0].Stock !== data[0].Stock){
        return true;
    }else{
        return false;
    }
})())

run("Make a Discount",true,(()=>{
    let data = interface.getAllProductDetails()
    return interface.makeDiscount(data[0].ProductID,"2023-05-01T23:59:59","2023-06-30T23:59:59","0.5")
})())

run("Remove a Discount",true,(()=>{
    const data = interface.getAllUserDetails()
    return interface.deleteDiscount(data[0].DiscountID)
})())

//Clears all tables to allow the tests to be run again
interface.Database.deleteTable("User")
interface.Database.deleteTable("Discounts")
interface.Database.deleteTable("Products")
interface.Database.deleteTable("Sales")
interface.Database.deleteTable("SaleItems")
interface.Database.deleteTable("Payments")
