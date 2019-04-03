const mongoose = require('mongoose');
const Admin = mongoose.model('landlord');
const Assets = mongoose.model('assets');
const User = mongoose.model('user');
const Rents = mongoose.model('rents');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { sendJSONResponse } = require('../helpers');

module.exports.addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const admin = new Admin() ;
  admin.name = name;
  admin.email = email;
  admin.setPassword(password);

  await admin.save();

  sendJSONResponse(res, 200, {
    status: 200,
    admin,
    message: 'Admin added succesfully '
  });
};
module.exports.addAssets = async (req, res) => {
  const { name,state ,address,country,price } = req.body;
  const assets = new Assets() ;
  assets.name = name;
  assets.state = state;
  assets.address = address;
  assets.country = country;
  assets.price = price;

  await assets.save();

  sendJSONResponse(res, 200, {
    status: 200,
    assets,
    message: 'Asset added succesfully '
  });
};

module.exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        sendJSONResponse(res, 400, "No token Provided");
    } else {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                sendJSONResponse(res, 500, err);
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

module.exports.loginAdmin = async (req, res) => {
    const { email, password} =  req.body ;
    const admin = await Admin.findOne({email});
    if(!admin) 
    {
        return sendJSONResponse(res, 400, {
            message: 'Invalid Login details',
            status: 4
        });
    }
    const validPassword = admin.validPassword(password);
    if(!validPassword) {
        sendJSONResponse(res, 403, {
          message: 'Invalid Username and Password',
          status: 3
        });
        return;
    }
    const token = admin.generateJWt();
    sendJSONResponse(res, 200, {token, email, status: 1});


}
module.exports.allRents = async (req, res) => {
    const rents = await Rents.find().populate('assets').populate('user').exec();
    if(!rents) 
    {
        return sendJSONResponse(res, 204, {
            message: 'No rents found'
        });
    }
    sendJSONResponse(res, 200, {rents});
}
module.exports.allTenants = async (req, res) => {
    const tenants = await User.find({});
    if(!tenants) 
    {
        return sendJSONResponse(res, 204, {
            message: 'No Tenant found'
        });
    }
    sendJSONResponse(res, 200, {tenants});
}
module.exports.allAssets = async (req, res) => {
    const assets = await Assets.find({});
    if(!assets) 
    {
        return sendJSONResponse(res, 204, {
            message: 'No Assets found'
        });
    }
    sendJSONResponse(res, 200, {assets});
}


