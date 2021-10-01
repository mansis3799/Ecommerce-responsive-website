const express = require("express");
const router = express.Router();

const {isSignedIn,isAutheticated,isAdmin} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const {getOrderById,createOrder,getAllOrders,getparticularOrders,getOrder,getAllOrderStatus,updateStatus,removeOrder,userPurchaseList} = require("../controllers/order");

//Params
router.get("userId",getUserById);
router.get("orderId",getOrderById);

//Actual routes
router.post("/order/create",createOrder,pushOrderInPurchaseList,updateStock);

router.get("/order/all",getAllOrders); //CORRECT

router.get("/order/:orderId",getOrder);  //New

router.get("/order/status/:orderId",getAllOrderStatus); //CORRECT

router.put("/order/status/:orderId/:userId",updateStatus);

// router.get("/order/status/:userId",isSignedIn,isAutheticated,isAdmin,getOrderStatus);

// router.get("/order/status",getOrderStatus); //CORRECT

// router.delete("/order/:orderId/:userId",isSignedIn,isAdmin,isAutheticated,removeOrder);

module.exports = router;
