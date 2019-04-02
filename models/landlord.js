const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const landlordSchema = new mongoose.Schema({
    
    name: { type:String, required:true},
    email: { type:String, required:true},
    hash: String,
    salt: String
    
    
}, {timestamps: true});

landlordSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
      .toString('hex');
  };
  
  landlordSchema.methods.validPassword = function(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
      .toString('hex');
    return this.hash === hash;
  };
  
  landlordSchema.methods.generateJWt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000)
      },
      SECRET
    );
  };
  

module.exports = mongoose.model('landlord', landlordSchema);