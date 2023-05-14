/**
 * Router Setup for API Requests
 * @returns Express Router
 */

const interface = require("../DataBase/interface.js");

module.exports = (components) => {
    const {database, express} = components;
    const router = express.Router();

    router.get('/static_data', (req, res) => {

        const data = interface.getAllDiscountDetails()
        res.json({success:true,data:{Discounts:data}});
    });

    return router;
}