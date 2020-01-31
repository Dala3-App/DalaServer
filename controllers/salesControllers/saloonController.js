let typeOfBusinessModel = require('../../model/salesModels/typeOfBusiness');
let cityModel = require('../../model/salesModels/cityModel');
let findModel = require('../../model/salesModels/findModel');
let registerSaloonModel = require('../../model/salesModels/registerSaloon');
let packagesModel = require('../../model/salesModels/packages');
let User = require('../../model/generalModel/userRegistration');


let functions = {


    // business types
    addNewBusinessType: function (req, res) {
        if ((!req.body.name)) {
            res.json({ success: false, msg: 'Provide name of business' });
        }
        else {
            let business = typeOfBusinessModel({
                name: req.body.name,
                createdById: req.body.createdById,
            })
            business.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Already Exist' })
                }
                else {
                    var objId = data._id.toString()
                    var tranId = objId.slice(objId.length - 5)
                    typeOfBusinessModel.findByIdAndUpdate({ _id: data._id }, { $set: { tranId: tranId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                user: data
                            })
                        }
                    })
                }
            })
        }
    },

    getAllBusinessType: function (req, res) {
        typeOfBusinessModel.find({}, function (err, records) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to fetch records' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: records });
            }
        })
    },

    getBusinessById: function (req, res) {
        var tranId = req.params.tranId
        typeOfBusinessModel.find({ tranId: tranId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid tran id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })
    },


    // city 
    addNewCity: function (req, res) {
        if ((!req.body.cityName)) {
            res.json({ success: false, msg: 'Provide name of city' });
        }
        else {
            let city = cityModel({
                cityName: req.body.cityName,
                createdById: req.body.createdById,
            })
            city.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Already Exist' })
                }
                else {
                    var objId = data._id.toString()
                    var cityId = objId.slice(objId.length - 5)
                    cityModel.findByIdAndUpdate({ _id: data._id }, { $set: { cityId: cityId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                user: { id: data }
                            })
                        }
                    })
                }
            })
        }
    },
    getAllCities: function (req, res) {
        cityModel.find({}, function (err, records) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to fetch records' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: records });
            }
        })
    },
    getCityById: function (req, res) {

        var cityId = req.params.cityId
        cityModel.find({ cityId: cityId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid city id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })


    },



    // find reasons
    addNewReason: function (req, res) {
        if ((!req.body.findReason)) {
            res.json({ success: false, msg: 'Provide name of city' });
        }
        else {
            let reasons = findModel({
                findReason: req.body.findReason,
                createdById: req.body.createdById,
            })
            reasons.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Already Exist' })
                }
                else {
                    var objId = data._id.toString()
                    var reasonId = objId.slice(objId.length - 5)
                    findModel.findByIdAndUpdate({ _id: data._id }, { $set: { reasonId: reasonId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                user: { id: data }
                            })
                        }
                    })
                }
            })
        }
    },
    getAllReasons: function (req, res) {
        findModel.find({}, function (err, records) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to fetch records' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: records });
            }
        })
    },
    getReasonById: function (req, res) {

        var reasonId = req.params.reasonId
        findModel.find({ reasonId: reasonId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid city id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })


    },



    registerNewSaloon: function (req, res) {
        if ((!req.body)) {
            res.json({ success: false, msg: 'Provide all fields' });
        }
        else {
            User.findOne({ email: req.body.email }, function (err, found) {
                if (found) { res.send({ success: false, msg: 'Email already registered' }) }
                else {
                    let business = registerSaloonModel({
                        ...req.body
                    })
                    business.save(function (err, data) {
                        if (err) {
                            return res.send({ success: false, msg: 'Email already exist' })
                        }
                        else {
                            var objId = data._id.toString()
                            var shopId = objId.slice(objId.length - 5)
                            var newUser = User({
                                username: req.body.firsName,
                                email: req.body.email,
                                password: req.body.password,
                                createdById: req.body.createdById,
                                role: req.body.role,
                                profileImg: req.body.profileImg,
                                isActive: req.body.isActive
                            })
                            newUser.save(function (err, user) {
                                if (err) {
                                    return res.send({ success: false, msg: 'Failed to save or email already exist', err })
                                }
                                else {
                                    var objId = user._id.toString()
                                    var userId = objId.slice(objId.length - 5)
                                    User.findByIdAndUpdate({ _id: user._id }, { $set: { userId: userId } }, function (err, doc) {
                                        if (err) {
                                            return res.send({ success: false, msg: 'Failed to save user' })
                                        }
                                        else {
                                            registerSaloonModel.findByIdAndUpdate({ _id: data._id }, { $set: { userId: userId, shopId: shopId } }, function (err, doc) {
                                                if (err) {
                                                    return res.send({ success: false, msg: 'Failed to save user id in saloon form' })
                                                }
                                                else {
                                                    // let token = jwt.encode(user, config.secret);
                                                    res.json({
                                                        success: true,
                                                        msg: 'Successfully saved',
                                                        user
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    getAllShops: function (req, res) {
        registerSaloonModel.find({}, function (err, records) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to fetch records' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: [records] });
            }
        })
    },

    getByShopId: function (req, res) {
        var shopId = req.params.shopId
        // var shopId = 'b951c'
        console.log("id", shopId)
        registerSaloonModel.find({ shopId }, function (err, data) {
            console.log(data, "data")
            if (err) {
                return res.send({ success: false, msg: 'Invalid shop id' })
            }
            else {
                return res.send({ success: true, msg: 'Successfully', data: [data] });
            }
        })
    },

    getByUserIdShop: function (req, res) {
        var userId = req.params.userId
        registerSaloonModel.find({ userId: userId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid user id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })
    },

    getByCreatedByShop: function (req, res) {
        var createdById = req.params.createdById
        registerSaloonModel.find({ createdById: createdById }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid user id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: [data] });
            }
        })
    },

    deleteShopById: function (req, res) {
        var shopId = req.params.shopId
        registerSaloonModel.findOneAndDelete({ shopId: shopId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid shop id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })
    },

    updateShop: function (req, res) {
        var shopId = req.body.shopId
        registerSaloonModel.findOneAndUpdate({ shopId: shopId }, req.body, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid shop id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })
    },

    // packages
    addNewPackage: function (req, res) {

        if ((!req.body.packageName)) {
            res.json({ success: false, msg: 'Provide name of pakage' });
        }
        else {
            let package = packagesModel({
                packageName: req.body.packageName,
                packagePrice: req.body.packagePrice,
                createdById: req.body.createdById,
                packageDuration: req.body.packageDuration,
                packageType: req.body.packageType,
            })
            package.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Already Exist', err })
                }
                else {
                    var objId = data._id.toString()
                    var packageId = objId.slice(objId.length - 5)
                    packagesModel.findByIdAndUpdate({ _id: data._id }, { $set: { packageId: packageId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                user: { id: data }
                            })
                        }
                    })
                }
            })
        }
    },


    getAllPackages: function (req, res) {
        packagesModel.find({}, function (err, records) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to fetch records' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: records });
            }
        })
    },

    getPackageById: function (req, res) {
        var packageId = req.params.packageId
        packagesModel.find({ packageId: packageId }, function (err, data) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid package id' })
            }
            else {
                res.json({ success: true, msg: 'Successfully', data: data });
            }
        })
    },


    getShopByCategories: function (req, res) {
        var categoryIds = req.params.categoryId
        // packagesModel.find({ "menu": { $elemMatch: { categoryId: categoryId } } }, function (err, data) {
        if (categoryIds == 0) {
            registerSaloonModel.find({}, function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Invalid category id', err })
                }
                else {
                    res.json({ success: true, msg: 'Successfully', data: data });
                }
            })
        }
        else {
            registerSaloonModel.find({ "menu": { $elemMatch: { categoryId: categoryIds } } }, function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Invalid category id', err })
                }
                else {
                    res.json({ success: true, msg: 'Successfully', data: data });
                }
            })
        }
    }
}

module.exports = functions;
