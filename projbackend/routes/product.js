const express = require("express");
const router = express.Router();

const {getProductById,createProduct,getProduct,photo,updateProduct,removeProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product");
const {isSignedIn,isAutheticated,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//Params
router.param("userId",getUserById);
router.param("productId",getProductById);

//Actual routes
router.post("/product/create/:userId",isSignedIn,isAutheticated,isAdmin,createProduct);

router.get("/product/:productId",getProduct);

router.get("/product/photo/:productId",photo);

router.put("/product/:productId/:userId",isSignedIn,isAutheticated,isAdmin,updateProduct);

router.delete("/product/:productId/:userId",isSignedIn,isAutheticated,isAdmin,removeProduct);

router.get("/products/categories",getAllUniqueCategories);

router.get("/products",getAllProducts);

module.exports = router;
