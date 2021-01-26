const { success, failed } = require("../config/response")
const { users, books, orders } = require('../models')

exports.postTrx = async (req, res) => {
    try {
        const data = await orders.bulkCreate(req.body.orders);
        return res.json(success({
            message: "data berhasil diterima", data
        }));
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};