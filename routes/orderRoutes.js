const express = require("express");
const Router = express.Router();

// CONTROLLERS
const { postTrx } = require("../controllers/orderController");

// VALIDATORS
const { runValidator, postTrxValidator } = require("../validators/orderValidator");

Router.post("/transactions", postTrxValidator, runValidator, postTrx);

module.exports = Router;