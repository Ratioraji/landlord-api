const mongoose = require('mongoose');
const { sendJSONResponse } = require('../helpers');
const Joi = require('joi');

module.exports.validateAdmin = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  }
}

module.exports.validateUser = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(4).required()
   
   
  }
}
module.exports.validateAssets = {
  body: {
    name: Joi.string().required(),
    state: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.string().required()

  }
}
module.exports.validateRentDetails = {
  body: {
    assetID: Joi.string().required(),
    duration: Joi.string().required(),
    rentReason: Joi.string().required(),
    occupation:  Joi.string().required()

  }
}

