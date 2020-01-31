let User = require('../../model/generalModel/userRegistration');
let shopModel = require('../../model/salesModels/registerSaloon');
let sendMail = require('../../controllers/sendEmailController');
let config = require('../../config/database');
let jwt = require('jwt-simple');
// let emailController = require('../../controllers/sendEmailController');


let functions = {

    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.send({ success: false, msg: 'Authentication failed, User not found' });
            } else {
                var isMatch = true
                if (isMatch && !err) {

                    if (user.role == "user") {
                        if (user.role == "user" && user.isVerified == false) {
                            return res.send({ success: false, msg: 'Kindly verify your email' });
                        }
                        else {

                            let token = jwt.encode(user, config.secret);
                            return res.send({
                                success: true,
                                token: "JWT " + token,
                                user: user
                            })
                        }
                    }


                    if (user.role == "sellers") {
                        shopModel.findOne({ userId: user.userId }, function (errors, resp) {
                            if (errors) {
                                return res.send({
                                    success: false,
                                    errors
                                })
                            }
                            else {
                                let token = jwt.encode(user, config.secret);
                                return res.send({
                                    success: true,
                                    token: "JWT " + token,
                                    user: user,
                                    shopDetail: resp
                                })
                            }
                        })
                    }




                    // if (user.role == "sales") {
                    //     User.findOne({ userId: user.createdById }, function (errors, records) {
                    //         console.log(records, 'records')
                    //         if (records == null) {
                    //             console.log('sales chala')
                    //             let token = jwt.encode(user, config.secret);
                    //             res.send({
                    //                 success: true,
                    //                 token: "JWT " + token,
                    //                 user: user,
                    //             })
                    //         }
                    //         else {
                    //             console.log('sales again')
                    //             shopModel.findOne({ userId: records.userId }, function (request, response) {
                    //                 let token = jwt.encode(user, config.secret);
                    //                 res.send({
                    //                     success: true,
                    //                     token: "JWT " + token,
                    //                     user: user,
                    //                     shopId: response.shopId
                    //                 })
                    //             })
                    //         }
                    //     })
                    // }
                    if (user.role == "sales") {
                        let token = jwt.encode(user, config.secret);
                        return res.send({
                            success: true,
                            token: "JWT " + token,
                            user: user,
                            // shopId: response.shopId
                        })
                    }

                    if (user.role == "admin") {
                        let token = jwt.encode(user, config.secret);
                        return res.send({
                            success: true,
                            token: "JWT " + token,
                            user: user,
                            // shopId: response.shopId
                        })
                    }

                } else {
                    return res.send({ success: false, msg: 'Authenticaton failed, wrong password.' });
                }

            }
        })
    },

    addNew: function (req, res) {
        if ((!req.body.email) || (!req.body.password) || (!req.body.role) || (!req.body.createdById)) {
            res.json({ success: false, msg: 'Enter all values' });
        }
        else {

            var newUser = User({
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isActive: req.body.isActive,
                createdById: req.body.createdById,
                role: req.body.role,
                verification_code: req.body.verification_code,
                profileImg: req.body.profileImg,
                emialSubscription: req.body.emialSubscription,
                phone: req.body.phone,
                serviceSubscription: req.body.serviceSubscription,
                isVerified: req.body.isVerified,
                isVisited: req.body.isVisited,
                isDeleted: req.body.isDeleted
            })

            newUser.save(function (err, user) {
                if (err) {
                    return res.send({ success: false, msg: 'Email already exist', err })
                }
                else {
                    var objId = user._id.toString()
                    var userId = objId.slice(objId.length - 5)
                    User.findByIdAndUpdate({ _id: user._id }, { $set: { userId: userId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            var message = `In order to start using your Dala3 account, you need to activate this account`

                            // var link = 'http://' + req.get('host') + '/api/verifyUser/' + userId //local
                            var link = 'https://' + req.get('host') + '/api/verifyUser/' + userId //live
                            var buttonMessage = 'Start using your Account Click here to verify'
                            sendMail(user, link, message, buttonMessage)
                            let token = jwt.encode(user, config.secret)
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                token: "JWT " + token,
                                user
                            })
                        }
                    })
                }
            })
        }
    },

    getUser: function (req, res) {
        User.findOne({
            userId: req.params.userId
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({ success: false, msg: 'Invalid user id , Profile not found' });
            } else {
                res.json({ success: true, user: user });
            }
        })
    },

    updateUser: function (req, res) {
        User.findOneAndUpdate({ userId: req.body.userId }, req.body)
            .then((user) => {
                // function (err, user) {
                if (!user) {
                    return res.send({ success: false, msg: 'Failed to update or Email already exist.' })
                }
                else {
                    User.find({ userId: req.body.userId }, function (error, data) {
                        return res.json({ success: true, msg: 'Successfully updated', user: data[0] });
                    })

                }
                // }
            })
    },

    updateProfilePic: function (req, res) {
        var userId = req.body.userId
        var image = req.body.profileImg

        if (!userId || !image) {
            return res.send({ success: false, msg: "provide userId and profile image url" })
        }
        User.findOneAndUpdate({ userId: userId }, { $set: { profileImg: '' } }, function (error, save) {
            if (error) {
                return res.send({ success: false, msg: "Failed to save image" })
            }
            else {
                User.find({ userId: userId }, function (error, data) {
                    return res.json({ success: true, msg: 'Image successfully updated', user: data })
                })


            }
        })
    },

    updatePassword: function (req, res) {
        var newPassword = req.body.newPassword
        var oldPassword = req.body.oldPassword
        if (!newPassword || !oldPassword) {
            return res.send({ success: false, msg: 'Provide old password and new password' })
        }
        User.findOne({ userId: req.body.userId }, function (err, user) {
            if (err) {
                return res.send({ success: false, msg: 'Invalid user id ' })
            }
            else {
                user.comparePassword(oldPassword, function (error, isMatch) {
                    if (isMatch && !err) {
                        user.password = newPassword
                        user.save()
                            .then((asd) => {
                                res.json({ success: true, msg: "successfully saved password", user })
                            })
                    } else {
                        return res.send({ success: false, msg: 'Authenticaton failed, wrong password.' });
                    }
                })
            }
        })
    },

    getByRole: function (req, res) {
        User.findOne({
            role: req.params.role
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(403).send({ success: false, msg: 'Role not found' });
            } else {
                res.json({ success: true, user: user });
            }
        })
    },

    getAllUser: function (req, res) {
        User.find({}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(403).send({ success: false, msg: 'Role not found' });
            } else {
                res.json({ success: true, user: user });
            }
        })
    },

    deleteUserById: function (req, res) {
        var userId = req.params.userId
        user.findOneAndDelete({
            userId
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(403).send({ success: false, msg: 'user not found' });
            } else {
                res.json({ success: true, msg: "successfully deleted" });
            }
        })
    },

    getUserByCreatedById: function (req, res) {

        var userId = req.params.userId

        User.find({ createdById: userId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                return res.send({ success: true, msg: "No user Found", data: [] })
            }
            else {
                return res.send({ success: true, msg: "fetched user", data })
            }
        })
    },

    verifyUser: function (req, res) {
        var userId = req.params.userId
        User.findOneAndUpdate({ userId: userId }, { isVerified: true }, function (err, data) {
            if (err) throw err;
            if (!data) {
                return res.send({ success: true, msg: "No user Found" })
            }
            else {
                return res.send("Verification successfull, Thankyou for verification now you can use Dala3 application")
            }
        })

    },

    forgetPassword: function (req, res) {
        var email = req.body.email
        User.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (!data) {
                return res.send({ success: false, msg: "Email not found" })
            }
            else {
                // var link = 'http://' + req.get('host') + '/api/reset/password/' + data.userId //local
                var link = 'https://' + req.get('host') + '/api/reset/password/' + data.userId //live
                var message = `You've recently requested for recover your password `
                var buttonMessage = 'Reset Password'
                sendMail(data, link, message, buttonMessage)
                return res.send({ success: true, msg: "Email send successfully" })
            }
        })
    },

    resetPassword: function (req, res) {
        User.findOne({
            userId: req.params.userId
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({ success: false, msg: 'email not found' });
            } else {
                user.password = '123456'
                user.save()
                    .then((asd) => {
                        return res.send("Password reset successfully, Now you use '123456' as password. kindly change your password once you login ");
                    })
            }
        })
    },

    addAsClient: function (req, res) {
        if ((!req.body)) {
            res.json({ success: false, msg: 'Provide all fields' });
        }
        else {
            User.findOne({ email: req.body.email }, function (err, found) {
                if (found) {
                    User.find({ "registeredIn": { $elemMatch: { shopId: req.body.registeredIn[0].shopId } }, email: req.body.email }, function (errs, data) {
                        if (errs) {
                            return res.send({ success: false, msg: 'can not save', errs })
                        }
                        else {
                            if (data[0] != undefined) {
                                return res.send({ success: false, msg: 'Client already Exist', data })
                            }
                            else {
                                User.findOneAndUpdate({ email: req.body.email }, req.body, function (error, saveData) {
                                    if (error) {
                                        return res.send({ success: false, msg: 'can not save', err })
                                    }
                                    else {
                                        return res.send({ success: true, msg: 'saved successfully ', data: saveData })
                                    }
                                })
                            }
                        }
                    })
                }
                else {
                    var dataToSave = {
                        username: req.body.additionalInfo[0].firstName,
                        email: req.body.email,
                        isActive: true,
                        password: "43223423",
                        createdById: "-1",
                        role: "user",
                        verification_code: "",
                        profileImg: "",
                        emialSubscription: false,
                        phone: "",
                        serviceSubscription: false,
                        isVerified: false,
                        isVisited: false,
                        isDeleted: false,
                        cardInfo: {
                            cardNumber: "",
                            cardHolderName: "",
                            expireDate: "",
                            cvv: "",
                            userId: ""
                        },
                        additionalInfo: req.body.additionalInfo,
                        registeredIn: req.body.registeredIn,
                        location: {
                            latitude: "",
                            longitude: ""
                        }
                    }
                    let newUser = User({ ...dataToSave })
                    newUser.save(function (err, user) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save', err })
                        }
                        else {
                            var objId = user._id.toString()
                            var userId = objId.slice(objId.length - 5)
                            User.findByIdAndUpdate({ _id: user._id }, { $set: { userId: userId } }, function (err, doc) {
                                if (err) {
                                    return res.send({ success: false, msg: 'Failed to save user' })
                                }
                                else {
                                    return res.send({ success: true, msg: 'saved ', data: doc })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    getAllClients: function (req, res) {
        var shopId = req.params.shopId
        User.find({ "registeredIn": { $elemMatch: { shopId: shopId } } }, function (error, data) {
            if (error) {
                return res.send({ success: false, msg: "can't get data " })
            }
            else {
                return res.send({ success: true, msg: "successfully get", data })
            }
        })
    },

    updateClientInfo: function (req, res) {
        var userId = req.body.userId
        User.findOneAndUpdate({ userId: userId }, req.body, function (err, user) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to update' })
            }
            else {
                res.json({ success: true, msg: 'Successfully updated', user: user });
            }
        })
    },

};

module.exports = functions;

// var json ={
//     "email": "prince.anus234@gmail.com",
//     "isActive": true,
//     "createdById": "-1",
//     "role": "user",
//     "registeredIn": [
//       {
//         "shopId": "327c8",
//         "shopName": "studnet adasdas",
//         "isRegisterFee": false,
//         "isActive": true
//       }
//     ],
//     "additionalInfo": [
//       {
//         "Firstname": "anas",
//         "Lastname": "khan",
//         "Mobile": "03422399919",
//         "Telephone": "03422399919",
//         "Email": "prince.anus234@gmail.com",
//         "Gender": "Male",
//         "ReferralSource": "",
//         "Birthday": "2020-01-03",
//         "Clientnotes": "asdasd",
//         "checkbox": ""
//       }
//     ]
//   }