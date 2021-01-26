const express = require("express");
const Router = express.Router();

// CONTROLLERS
const { postTrx } = require("../controllers/orderController");
const { getUsersJoinBooks } = require("../controllers/userController")

// VALIDATORS
const { runValidator, postTrxValidator } = require("../validators/orderValidator");

Router.post("/transactions", postTrxValidator, runValidator, postTrx);

Router.get("/transactions/users", getUsersJoinBooks)

module.exports = Router;