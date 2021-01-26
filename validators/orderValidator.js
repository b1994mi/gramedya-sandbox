const { body, validationResult } = require('express-validator')
const { failed } = require('../config/response')
const { orders, books, users, sequelize } = require('../models')

exports.runValidator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json(failed({
            message:
                errors.array()[0].msg
        }))
    }
    return next()
}

exports.postTrxValidator = [
    body().custom(async ({ orders }) => {
        const nowDatetime = new Date();
        let clearance = true;
        // Cek sederhana apakah request yg dikirimkan berupa array
        if (!Array.isArray(orders)) {
            clearance = Promise.reject("orders bukan sebuah array");
        };
        let q = [];
        // Kemudian cek apakah setiap elementnya punya property dgn jenis number
        for (let i = 0; i < orders.length; i++) {
            const {users_id, books_id, qty} = orders[i];
            if(users_id && books_id && qty) {
                q = [`u.id = ${users_id}`, ...q];
            } else {
                clearance = Promise.reject(`Ada field yg blm lengkap di index ${i}`);
                break;
            }
            // Tambah property untuk kolom order_at
            orders[i].order_at = nowDatetime;
        };
        console.log(q.join(" OR "))
        // sequelize.query("SELECT * FROM users AS u WHERE ")
        return clearance;
    })
];