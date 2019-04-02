const mongoose = require('mongoose');

const assetsSchema = new mongoose.Schema({
    
    name: { type:String, required:true},
    state: { type:String, required:true},
    address: { type:String, required:true},
    country: { type:String },
    price: { type:String }
    
}, {timestamps: true});


module.exports = mongoose.model('assets', assetsSchema);