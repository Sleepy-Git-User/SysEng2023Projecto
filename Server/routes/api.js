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

    return router;
}