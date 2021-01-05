const joi = require("joi");

const schemaLogin = joi.object({
  username: joi.string().min(4).max(15).required().messages(),
  password: joi.string().min(4).max(15).required().messages(),
});

const schemaUser_info = joi.object({
  phonenumber: joi.number().min(10).required().messages(),
  address: joi.string().min(10).messages(),
  dob: joi.date().messages(),
});

module.exports = { schemaLogin, schemaUser_info };
