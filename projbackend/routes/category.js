const express = require("express");
const router =  express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");
const {isSignedIn,isAdmin,isAutheticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//Params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//Actual routes are goes here 
router.post("/category/create/:userId",isSignedIn,isAdmin,isAutheticated,createCategory);

router.get("/category/:categoryId",getCategory); //read route

router.get("/categories",getAllCategory); //read route

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAutheticated,isAdmin,updateCategory);

//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAdmin,isAutheticated,removeCategory);

module.exports = router;