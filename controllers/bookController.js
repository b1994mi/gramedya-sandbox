const { success, failed } = require("../config/response")
const { books, type_books } = require('../models')

exports.getBooks = async (req, res) => {
    try {
        const data = await books.findAll({
            include: { model: type_books }
        });
        return res.json(success({
            message: "data berhasil diterima", data
        }));
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};

exports.postBook = async (req, res) => {
    try {
        const data = await books.create(req.body);
        return res.json(
            success({
                message: `data Book name: ${req.body.name} berhasil ditambahkan`
                , data
            })
        );
    } catch (error) {
        return res.json(
            failed({
                message: "terjadi kesalahan sistem"
                , data: error
            })
        );
    }
};

exports.editBookById = async (req, res) => {
    try {
        const where = { where: { id: req.body.id } };
        const data = await books.update(req.body, where);
        return res.json(
            success({ message: `Berhasil ubah Book ID ${req.body.id}`, data })
        );
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};

exports.deleteBookById = async (req, res) => {
    try {
        const where = { where: { id: req.body.id } };
        const data = await books.destroy(where);
        return res.json(
            success({ message: `Berhasil hapus Book ID ${req.body.id}`, data })
        );
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};