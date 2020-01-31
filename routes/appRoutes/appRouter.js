let express = require('express');
let categoryController = require('../../controllers/applicationControllers/appCategoryCon');
let generalController = require('../../controllers/generalController/userController');
let cityCountryController = require('../../controllers/generalController/cityCountry');
let bookingController = require('../../controllers/applicationControllers/bookingController');
let passport = require('passport');



let router = express.Router();
let requireAuth = passport.authenticate('jwt', { session: false });

// /api/app/dala/
// new and updated
router.post('/user/login', generalController.authenticate)
router.post('/user/register', generalController.addNew)
router.get('/getuser/:userId', generalController.getUser)
router.post('/updateuser', generalController.updateUser)
router.post('/user/update/profileImg', generalController.updateProfilePic)
router.post('/user/update/password', generalController.updatePassword)
router.get('/user/getAll', generalController.getAllUser)
router.get('/user/byCreatedById/:userId', generalController.getUserByCreatedById)
router.get('/verifyUser/:userId', generalController.verifyUser);
router.post('/forget/password', generalController.forgetPassword)
router.get('/reset/password/:userId', generalController.resetPassword)



/**
 * client
 */
router.post('/add/client', generalController.addAsClient);
router.get('/get/client/shopId/:shopId', generalController.getAllClients);
router.post('/update/client', generalController.updateClientInfo);






/**
 * Users
 */
// router.post('/user/update/profile', appUserController.updateProfilePic);
// router.post('/user/signIn', appUserController.authenticate);
// router.post('/user/signup', appUserController.addNew);
// router.get('/getuser/:userId', requireAuth, appUserController.getUser);
// router.post('/updateuser', requireAuth, appUserController.updateUser);



router.post('/add/category', categoryController.addNewCategory);
router.get('/getAll/category', categoryController.getAllCategory);
router.post('/update/category', categoryController.updateCategory);
router.get('/delete/category/:categoryId', categoryController.deleteCategory);



/**
 * booking
 */
router.post('/add/booking', bookingController.addNewBooking)
router.get('/get/userId/booking/:userId', bookingController.getUserBooking)
router.get('/get/booking/shop/:shopId', bookingController.getBookingForShop)
router.get('/get/booking/admin', bookingController.getBookingForAdmin)




router.post("/get/favourites/shop",bookingController.favourites)


/**
 * city country
 */
router.post('/add/city', cityCountryController.addNewCity)
router.post('/add/country', cityCountryController.addNewCountry)

router.get('/getAll/country', cityCountryController.getAllCountry)
router.get('/get/city/:countryId', cityCountryController.getCityByCountryId)



/**
 * Check protected
 */
router.get('/protected', requireAuth, function (req, res) {
    res.send({ success: true });
});

module.exports = router;

