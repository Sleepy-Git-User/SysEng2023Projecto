/**
 * Router Setup for API Requests
 * @returns Express Router
 */
module.exports = (components) => {
    const {database, express} = components;
    const router = express.Router();

    router.get('/static_data', (req, res) => {


        res.json({success: true, data: {
            products: [
                {name: 'Nuts', quantity: 10},
                {name: 'Coke Zero', quantity: 10000},
                {name: 'Pepsi', quantity: 9},
                {name: 'Fish', quantity: 2.3233},
            ]
        }});
    });

    return router;
}