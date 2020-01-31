let express = require('express');
// let saleController = require('../../controllers/salesControllers/salesTeam');
let saloonController = require('../../controllers/salesControllers/saloonController');
let genralController = require('../../controllers/salesControllers/genralController');
let freelancerController = require('../../controllers/salesControllers/freelancerController');
let categoryController = require('../../controllers/salesControllers/categoryController');
let serviceController = require('../../controllers/salesControllers/servicesController');
let businessController = require('../../controllers/salesControllers/businessController');
let feedbackController = require('../../controllers/salesControllers/feedbackController');





let passport = require('passport');
let router = express.Router();
let requireAuth = passport.authenticate('jwt', { session: false });


// router.post('/admin/create', adminController.registerAdmin);




// /**
//  * Users
//  */
// router.post('/user/signIn', userController.authenticate);
// router.post('/user/signup', userController.addNew);
// router.get('/getuser/:userId', requireAuth, userController.getUser);
// router.post('/updateuser', requireAuth, userController.updateUser);

/**
 * sale Team
 */
// router.post('/sale/signup', saleController.registerSale);
// router.post('/sale/login', saleController.loginSale);
// router.post('/sale/update/password', saleController.updatePassword);
// router.get('/sale/get/byRole/:role', saleController.getByRole);
// router.delete('/sale/delete/byUserId/:userId', saleController.deleteUserById);




/**
 * saloon
 */

//  pakages 
router.post('/saloon/add/packages', saloonController.addNewPackage);
router.get('/saloon/getAll/packages', saloonController.getAllPackages);
router.get('/saloon/getById/packages/:packageId', saloonController.getPackageById);

//  business Type
router.post('/saloon/add/typeOfBusiness', saloonController.addNewBusinessType);
router.get('/saloon/getAll/typeOfBusiness', saloonController.getAllBusinessType);
router.get('/saloon/getById/typeOfBusiness/:tranId', saloonController.getBusinessById);

//  city 
router.post('/saloon/add/city', saloonController.addNewCity);
router.get('/saloon/getAll/city', saloonController.getAllCities);
router.get('/saloon/getById/city/:cityId', saloonController.getCityById);


//  find Reasons 
router.post('/saloon/add/findReason', saloonController.addNewReason);
router.get('/saloon/getAll/findReason', saloonController.getAllReasons);
router.get('/saloon/getById/findReason/:reasonId', saloonController.getReasonById);




//  register Saloon 
router.post('/saloon/add/shop', saloonController.registerNewSaloon);
router.get('/saloon/getAll/shops', saloonController.getAllShops);
router.get('/saloon/get/byShopId/shops/:shopId', saloonController.getByShopId);
router.get('/saloon/get/byUserId/shops/:userId', saloonController.getByUserIdShop);
router.get('/saloon/get/createdById/shops/:createdById', saloonController.getByCreatedByShop);
router.get('/saloon/delete/byShopId/shops/:shopId', saloonController.deleteShopById);
router.post('/saloon/update/shops', saloonController.updateShop);
router.get('/saloon/get/shops/:categoryId', saloonController.getShopByCategories);





// contact us
router.post('/add/contactUs', genralController.addContactUs);
router.get('/getAll/contactUs', genralController.getAllContactDetails);
router.get('/get/byCreatedById/contactUs/:createdById', genralController.getByCreatedByContact);



// freelancer Apis 

router.post('/dala/add/freelancer', freelancerController.addFreelancer);
router.get('/dala/get/byFreelancerId/freelancer/:freelancerId', freelancerController.getByIdFreelancer);
router.get('/dala/getAll/freelancer', freelancerController.getAllFreeLancer);



// category Apis
router.post('/dala/add/category', categoryController.addCategory);
router.post('/dala/update/category', categoryController.updateCategory);
router.get('/dala/getAll/category', categoryController.getAllCategory);
router.get('/dala/get/getByCategoryName/category/:category_name', categoryController.getByCategoryName);
router.delete('/dala/delete/byCategoryId/category/:categoryId', categoryController.deleteByCategoryId);



// services
router.post('/dala/add/service', serviceController.addService);
router.post('/dala/update/service', serviceController.updateServices);
router.get('/dala/getAll/services', serviceController.getAllServices);
router.get('/dala/get/byServiceId/service/:serviceId', serviceController.getByServiceId);
router.delete('/dala/delete/byServiceId/service/:serviceId', serviceController.deletByServiceId);
router.get('/dala/get/categoryId/subCatId/service/:categoryId/:subCatId', serviceController.getServiceByCategory);
router.get('/dala/get/categoryId/subCatId/shopId/service/:categoryId/:subCatId/:shopId', serviceController.getServiceByCategoryAndShopId);
router.get('/dala/get/categoryId/shopId/service/:categoryId/:shopId', serviceController.getServiceByOnlyCategoryAndShopId);
router.get('/dala/get/ByUserId/services/:userId', serviceController.getByUserId);


// business team 
router.post('/dala/add/businessTeam', businessController.addBusiness);
router.post('/dala/update/businessTeam', businessController.updateBusiness);
router.get('/dala/getAll/businessTeam', businessController.getAllBusinessTeam);
router.get('/dala/get/byBusinessTeamId/businessTeam/:businessTeamId', businessController.getByBusinessTeamId);
router.delete('/dala/delete/byBusinessTeamId/businessTeam/:businessTeamId', businessController.deleteByTeamId);




// router.get('/saloon/getById/findReason/:reasonId', saloonController.getReasonById);




/**
 * feedback
 */
router.post('/add/feedback', feedbackController.addFeedback);
router.get('/getAll/feedback', feedbackController.getAllFeedback);
router.get('/getAll/feedback/byCreatedById/:createdById', feedbackController.getAllFeedbackByCreatedById);




// router.post('/user/signup', userController.addNew);
// router.get('/getuser/:userId', requireAuth, userController.getUser);
// router.post('/updateuser', requireAuth, userController.updateUser);





/**
 * Check protected
 */
router.get('/protected', requireAuth, function (req, res) {
  res.send({ success: true });
});

module.exports = router;

