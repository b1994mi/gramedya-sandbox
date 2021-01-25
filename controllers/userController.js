const { success, failed } = require("../config/response")
const { users, books } = require('../models')

exports.getUsers = async (req, res) => {
    try {
        const data = await users.findAll({
            include: { model: books }
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

exports.postUser = async (req, res) => {
    try {
        const data = await users.create(req.body);
        return res.json(
            success({
                message: `data User name: ${req.body.name} berhasil ditambahkan`
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

exports.getUserById = async (req, res) => {
    try {
        const data = await users.findOne({
            where: { id: req.params.id }
            , include: { model: books }
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

exports.editUserById = async (req, res) => {
    try {
        const where = { where: { id: req.params.id } };
        const data = await users.update(req.body, where);
        return res.json(
            success({ message: `Berhasil ubah User ID ${req.params.id}`, data })
        );
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const where = { where: { id: req.params.id } };
        const data = await users.destroy(where);
        return res.json(
            success({ message: `Berhasil hapus User ID ${req.params.id}`, data })
        );
    } catch (error) {
        return res.json(
            failed({ message: "SALAH SISTEM", data: error })
        );
    }
};