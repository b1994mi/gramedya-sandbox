const { body, validationResult } = require('express-validator')
const { failed } = require('../config/response')
const { books, Sequelize, type_books } = require('../models')

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

exports.postBookValidator = [
    body("id", "User ID akan auto increment!").isEmpty()
    , body("name", "name harus terisi").notEmpty()
    , body().custom(async (body) => {
        if (typeof body.type_books_id === 'undefined' && typeof body.type === 'undefined') {
            return Promise.reject("type_books_id atau type harus ada dlm body");
        }
        if (typeof body.type_books_id === 'undefined') {
            const d = await type_books.findOne({ where: { name: body.type } });
            if (d === null) {
                return Promise.reject("type_books_id tidak ditemukan dgn type tsb.");
            }
            body.type_books_id = d.dataValues.id;
        }
        // Cek nama sudah ada atau blm, sengaja terakhir spy menghemat db read
        const bodyName = await books.findOne({ where: { name: body.name } });
        if (bodyName !== null) {
            return Promise.reject("Book name sudah digunakan");
        }
        return true;
    })
];

exports.editBookByIdValidator = [
    body().custom(async (body) => {
        if (typeof body.id === "undefined") {
            return Promise.reject("Book ID dlm body harus terisi");
        };
        // Validasi apakah record user dgn id tsb ada
        // dan apakah phone yg akan diganti sdh terpakai atau blm.
        const where = {
            where: Sequelize.or(
                { id: body.id }
                , { name: body.name ? body.name : '' }
            )
        };
        const include = { include: { model: type_books } };
        const book = await books.findAll(where, include);
        if (book.length > 1) {
            return Promise.reject("name sudah digunakan");
        }
        if (book.length < 1 || book[0].dataValues.id != body.id) {
            return Promise.reject(`Book ID ${body.id} tidak ditemukan`);
        }
        if (typeof body.type_books_id === 'undefined' && typeof body.type !== 'undefined') {
            const d = await type_books.findOne({ where: { name: body.type } });
            if (d === null) {
                return Promise.reject("type_books_id tidak ditemukan dgn type tsb.");
            }
            body.type_books_id = d.dataValues.id;
        }
        return true;
    })
];

exports.deleteBookByIdValidator = [
    body("id", "User ID dlm body harus terisi")
        .notEmpty()
        .custom(async (value) => {
            const book = await books.findByPk(value);
            if (book === null) {
                return Promise.reject(`User ID ${value} tidak ditemukan`);
            }
            return true;
        })
];