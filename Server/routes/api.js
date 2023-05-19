/**
 * Router Setup for API Requests
 * @returns Express Router
 */

const interface = require("../DataBase/interface.js")();

module.exports = (components) => {
    const {database, express} = components;
    const router = express.Router();

    router.get('/static_data', (req, res) => {
        res.json({success:true, data: {
            Discounts:interface.getAllDiscountDetails(),
            Products: interface.getAllProductDetails(),
        }});
    });

    router.get('/getUserDetails/:userID', (req, res)=>{
        res.json({success:true, data:{
            UserDetails:interface.getUserDetails(req.params.userID)
        }});
    })

    router.get('/getAllUserDetails', (req, res)=>{
        res.json({success:true, data:{
            UserDetails:interface.getAllUserDetails()
        }});
    })

    router.get('/getSingleProductDetails/:productID', (req, res)=>{
        res.json({success:true, data:{
            UserDetails:interface.getSingleProductDetails(req.params.productID)
        }});
    })

    router.post('/makeUser', (req, res)=>{
        interface.makeUser(req.body.Fname,req.body.Lname);
        res.json({success:true})
    });

    router.post('/loginChecker', async (req, res) => {
        try {
            const { userID } = req?.body;
            if (!userID) {
                return res.status(400).json({ success: false, message: 'Missing userID' });
            }
            const isValid = await interface.loginChecker(userID);
            return res.json({ success: isValid });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    });

    router.post('/removeUser', (req, res)=>{
        interface.removeUser(req.body.userID);
        res.json({success:true})
    });

    router.post('/toggleAdmin', (req, res)=>{
        interface.toggleAdmin(req.body.userID);
        res.json({success:true})
    });

    router.post('/editFname', (req, res)=>{
        interface.editFname(req.body.userID,req.body.Fname);
        res.json({success:true})
    });

    router.post('/editLname', (req, res)=>{
        interface.editLname(req.body.userID,req.body.Lname);
        res.json({success:true})
    });

    router.post('/addProduct', (req, res)=>{
        interface.addProduct(req.body.name,req.body.description,req.body.price,req.body.stock,req.body.category);
        res.json({success:true})
    });

    router.post('/removeProduct', (req, res)=>{
        interface.removeProduct(req.body.productID);
        res.json({success:true})
    });
    
    router.post('/editProductName', (req, res)=>{
        interface.editProductName(req.body.productID,req.body.value);
        res.json({success:true})
    });

    router.post('/editProductDescription', (req, res)=>{
        interface.editProductDescription(req.body.productID,req.body.value);
        res.json({success:true})
    });

    router.post('/editProductPrice', (req, res)=>{
        interface.editProductPrice(req.body.productID,req.body.value);
        res.json({success:true})
    });

    router.post('/editProductStock', (req, res)=>{
        interface.editProductStock(req.body.productID,req.body.value);
        res.json({success:true})
    });

    router.post('/makeDiscount', (req, res)=>{
        interface.makeDiscount(req.body.productID,req.body.startDate,req.body.endDate,req.body.amount);
        res.json({success:true})
    });

    router.post('/deleteDiscount', (req, res)=>{
        interface.makeDiscount(req.body.discountID);
        res.json({success:true})
    });

    router.post('/newSale', (req, res)=>{
        interface.newSale(req.body);
        res.json({success:true})
    });

    return router;
}