const express = require("express");
const router = express.Router();
const { isSignedIn,isAutheticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentroutes");
const {getUserById} = require("../controllers/user");

router.get("userId",getUserById);

router.get("/payment/gettoken",getToken);

router.post("/payment/braintree",processPayment);

module.exports = router;                     