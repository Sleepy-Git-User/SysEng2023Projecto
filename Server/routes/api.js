/**
 * Router Setup for API Requests
 * @returns Express Router
 */

const interface = require("../DataBase/interface.js");

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
        console.log(req.body);
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
    
    
    return router;
}