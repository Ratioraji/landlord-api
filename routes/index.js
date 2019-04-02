const express = require('express');
const router = express.Router();
const ctrlAdmin = require('../controllers/admin');
const ctrlUser = require('../controllers/user');
const middleWare = require('../policies/middleware')
const expressJoi = require('express-joi-validator');
const { catchErrors } = require('../helpers');

//admin routes
router.post(
  '/admin/login',
  catchErrors(ctrlAdmin.loginAdmin)
);
router.post(
  '/admin/register',
  expressJoi(middleWare.validateAdmin),
  catchErrors(ctrlAdmin.addAdmin)
);
router.post(
  '/admin/addassets',
  catchErrors(ctrlAdmin.authenticate),
  catchErrors(ctrlAdmin.addAssets)
);
router.get(
  '/admin/allrents',
  catchErrors(ctrlAdmin.authenticate),
  catchErrors(ctrlAdmin.allRents)
);

// user routes
router.get(
  '/user/assets',
  catchErrors(ctrlUser.authenticate),
  catchErrors(ctrlUser.allAssets)
);
router.post(
  '/user/rentasset',
  expressJoi(middleWare.validateRentDetails),
  catchErrors(ctrlUser.authenticate),
  catchErrors(ctrlUser.rentAsset)
);

router.post(
  '/user/register',
  expressJoi(middleWare.validateUser),
  catchErrors(ctrlUser.addUser)
);
router.post(
  '/user/login',
  catchErrors(ctrlUser.loginUser)
);


module.exports = router;
