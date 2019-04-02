const mongoose = require('mongoose');
const User = mongoose.model('user');
const Assets = mongoose.model('assets');
const rentInfo = mongoose.model('rents');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { sendJSONResponse } = require('../helpers');

module.exports.addUser = async (req, res) => {
  const { name, email,phoneNumber, password } = req.body;
  const user = new User() ;
  user.name = name;
  user.email = email;
  user.phoneNumber = phoneNumber ;
  user.setPassword(password) ;

  await user.save();

  sendJSONResponse(res, 200, {
    status: 200,
    user,
    message: 'User added succesfully '
  });
};

module.exports.loginUser = async (req, res) => {
    const { email, password} =  req.body ;
    const user = await User.findOne({email});
    if(!user) 
    {
        return sendJSONResponse(res, 400, {
            message: 'Invalid Login details',
            status: 4
        });
    }
    const validPassword = user.validPassword(password);
    if(!validPassword) {
        sendJSONResponse(res, 403, {
          message: 'Invalid Username and Password',
          status: 3
        });
        return;
    }
    const token = user.generateJWt();
    sendJSONResponse(res, 200, {token, email, status: 1});


}
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
                console.log(decoded);
                next();
            }
        })
    }
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

module.exports.rentAsset = async (req, res) => {
  const { assetID , duration ,rentReason, occupation } = req.body;
  const token = req.headers.authorization;
  const rentData = new rentInfo() ;
  let UserID ;
  if(token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        req.decoded = decoded;
        UserID = decoded._id ; 
      })
  }

  rentData.assetID = assetID ;
  rentData.userID = UserID ;
  rentData.duration = duration ;
  rentData.rentReason = rentReason ;
  rentData.occupation = occupation ;

  await rentData.save();

  sendJSONResponse(res, 200, {
    status: 200,
    rentData,
    message: 'User added succesfully '
  });
};
