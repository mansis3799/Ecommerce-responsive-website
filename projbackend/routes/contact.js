var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { contactme } = require("../controllers/contact");

router.post("/contactme",[
      check("firstname", "name should be at least 3 char").isLength({ min: 3 }),
      check("lastname", "name should be at least 3 char").isLength({ min: 3 }),
      check("email", "email is required").isEmail()
      //check("message", "message should be at least 3 char").isLength({ min: 3 })
    ],contactme);

module.exports=router;