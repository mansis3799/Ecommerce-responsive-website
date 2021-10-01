var express = require("express");
var router = express.Router();

const {getUserById, getuser, UpdateUser, userPurchaseList,OrderProductList,pushOrderInPurchaseList} = require("../controllers/user");
const { isSignedIn, isAutheticated, isAdmin} = require("../controllers/auth");
const {getProductById} = require("../controllers/product");
const {getOrderById} = require("../controllers/order");

router.param("userId",getUserById);

router.param("productId",getProductById);

router.param("orderId",getOrderById);

router.get("/user/:userId",isSignedIn,isAutheticated,getuser);

router.put("/user/:userId",isSignedIn,isAutheticated,UpdateUser);

router.get("/orders/user/:userId",isSignedIn,isAutheticated,userPurchaseList);

module.exports=router;

