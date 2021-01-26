const express = require("express");
const Router = express.Router();

// CONTROLLERS
const {
    getBooks
    , postBook
    , editBookById
    , deleteBookById
} = require("../controllers/bookController");

// VALIDATORS
const { runValidator
    , postBookValidator
    , editBookByIdValidator
    , deleteBookByIdValidator
} = require("../validators/bookValidator");

Router.route("/books")
    .get(getBooks)
    .post(postBookValidator, runValidator, postBook)
    .put(editBookByIdValidator, runValidator, editBookById)
    .delete(deleteBookByIdValidator, runValidator, deleteBookById);

module.exports = Router;