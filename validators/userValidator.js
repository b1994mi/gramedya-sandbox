const { body, param, validationResult } = require('express-validator')
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
    body("name")
        .notEmpty()
        .withMessage("name harus terisi")
        .custom(async (value) => {
            const user = await users.findOne({ where: { name: value } });
            return user ? Promise.reject("name sudah digunakan") : '';
        })
    , body("address", "address harus terisi").notEmpty()
    , body("phone", "phone harus terisi").notEmpty()
    , body("gender", "gender harus 'M' atau 'F'").isIn(["M", "F"])
];

exports.editUserByIdValidator = [
    body().custom(async ({ name, gender }, { req: { params: { id } } }) => {
        if (typeof gender !== "undefined" && gender !== "M" && gender !== "F") {
            return Promise.reject("gender harus terisi 'M' atau 'F'");
        };
        // Validasi apakah record user dgn id tsb ada
        // dan apakah nama yg akan diganti sdh terpakai atau blm.
        const where = { where: Sequelize.or({ id: id }, { name: name }) }
        const user = await users.findAll(where);
        if (user.length > 1) {
            return Promise.reject("name sudah digunakan");
        }
        if (user.length < 1 || user[0].dataValues.id !== id) {
            return Promise.reject(`User ID ${id} tidak ditemukan`);
        }
        return true;
    })
];

exports.deleteUserByIdValidator = [
    param("id").custom(async (value) => {
        const user = await users.findByPk(value);
        if (user === null) {
            return Promise.reject(`User ID ${value} tidak ditemukan`);
        }
        return true;
    })
];