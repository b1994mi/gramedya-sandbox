const express = require("express");
const Router = express.Router();

// CONTROLLERS
const {
    getUsers
    , postUser
    , getUserById
    , editUserById
    , deleteUserById
} = require("../controllers/userController");

// VALIDATORS
const { runValidator
    , postUserValidator
    , editUserByIdValidator
    , deleteUserByIdValidator
} = require("../validators/userValidator");

Router.route("/users")
    .get(getUsers)
    .post(postUserValidator, runValidator, postUser)
    .put(editUserByIdValidator, runValidator, editUserById)
    .delete(deleteUserByIdValidator, runValidator, deleteUserById);

// Router.route("/users/:id")
//     .get(getUserById)
//     .patch(editUserByIdValidator, runValidator, editUserById)
//     .delete(deleteUserByIdValidator, runValidator, deleteUserById);

module.exports = Router;