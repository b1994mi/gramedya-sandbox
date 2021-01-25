const { body, validationResult } = require('express-validator')
const { failed } = require('../config/response')
const { users, Sequelize } = require('../models')

exports.runValidator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json(failed({
            message:
                errors.array()[0].msg
        }))
    }
    next()
}

exports.postUserValidator = [
    body("id", "User ID akan auto increment!").isEmpty()
    , body("name", "name harus terisi").notEmpty()
    , body("address", "address harus terisi").notEmpty()
    , body("gender", "gender harus 'M' atau 'F'").isIn(["M", "F"])
    , body("phone", "phone harus terisi").notEmpty()
        .custom(async (value) => {
            const user = await users.findOne({ where: { phone: value } });
            return user ? Promise.reject("phone sudah digunakan") : true;
        })
];

exports.editUserByIdValidator = [
    body().custom(async ({ id, phone, gender }) => {
        if (typeof id === "undefined") {
            return Promise.reject("User ID dlm body harus terisi");
        };
        if (typeof gender !== "undefined" && gender !== "M" && gender !== "F") {
            return Promise.reject("gender harus terisi 'M' atau 'F'");
        };
        // Validasi apakah record user dgn id tsb ada
        // dan apakah phone yg akan diganti sdh terpakai atau blm.
        const where = {
            where: Sequelize.or(
                { id: id }
                , { phone: phone ? phone : '' }
            )
        };
        const user = await users.findAll(where);
        if (user.length > 1) {
            return Promise.reject("phone sudah digunakan");
        }
        if (user.length < 1 || user[0].dataValues.id != id) {
            return Promise.reject(`User ID ${id} tidak ditemukan`);
        }
        return true;
    })
];

exports.deleteUserByIdValidator = [
    body("id", "User ID dlm body harus terisi")
        .notEmpty()
        .custom(async (value) => {
            const user = await users.findByPk(value);
            if (user === null) {
                return Promise.reject(`User ID ${value} tidak ditemukan`);
            }
            return true;
        })
];