const Contact = require("../models/contact");
const { check, validationResult } = require("express-validator");

exports.contactme = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }

    const contact = new Contact(req.body);
    contact.save((err,contact) => {
       if (err) {
         //console.log("ERROR",err);
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      
      res.json({
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        message: contact.message,
        id: contact._id
      });
    });
  };
  