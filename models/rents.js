const mongoose = require('mongoose');
const Schema =  mongoose.Schema; 

const rentsSchema = new mongoose.Schema({
    
    assetID:{ type: Schema.Types.ObjectId, ref: 'assets' },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    duration: { type:String, required:true},
    rentReason: { type:String, required:true},
    occupation: { type:String, required:true},
    status: { type:String }
    
}, {timestamps: true});


module.exports = mongoose.model('rents', rentsSchema);