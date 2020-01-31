let bookingModel = require('../../model/applicationModels/bookingModels');
let servicesModel = require('../../model/salesModels/services');
let shopModel = require('../../model/salesModels/registerSaloon');



let functions = {



    addNewBooking: function (req, res) {
        if ((!req.body.createdById) || (!req.body.serviceId) || (!req.body.email)) {
            res.json({ success: false, msg: 'Provide services, email and createdById' });
        }
        else {

            var booking = bookingModel({ ...req.body })

            booking.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'Failed to save', err })
                }
                else {
                    var objId = data._id.toString()
                    var bookingId = objId.slice(objId.length - 6)

                    bookingModel.findByIdAndUpdate({ _id: data._id }, { $set: { bookingId: bookingId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                data
                            })
                        }
                    })
                }
            })
        }
    },

    getUserBooking: function (req, res) {
        // services id 
         
        var userId = req.params.userId
        var temp = []
        bookingModel.find({ createdById: userId }, async function (err, record) {
            console.log(record)
            if (!record) {
                return await res.send({ success: false, msg: 'No Record Found', data: newTemp })
            }

            else {
                for (let index = 0; index < record.length; index++) {
                    for (let i = 0; i < record[index].serviceId.length; i++) {
                        await servicesModel.find({ serviceId: record[index].serviceId[i] }, function (error, dataToPush) {
                            var sendData = Object.assign({}, dataToPush[0])._doc
                            sendData.serviceTime = record[index].serviceTime
                            sendData.servicesDate = record[index].servicesDate
                            temp.push(sendData)
                        })
                    }
                }
                return await res.send({ success: true, msg: 'successfully', data: temp })
            }
        })
    },


    getBookingForShop: function (req, res) {
        var shopId = req.params.shopId
        var temp = []
        bookingModel.find({ shopId: shopId }, async function (err, record) {
            for (let index = 0; index < record.length; index++) {
                for (let i = 0; i < record[index].serviceId.length; i++) {
                    await servicesModel.find({ serviceId: record[index].serviceId[i] }, function (error, dataToPush) {
                        var sendData = Object.assign({}, record[index])._doc
                        sendData.serviceName = dataToPush[0].serviceName
                        temp.push(sendData)
                    })
                }
            }
            return await res.send({ success: true, msg: 'successfully', data: temp })
        })
    },


    favourites: (req, res) => {
        if (!req.body.shopIdList) {
            res.json({ success: false, msg: 'provide shopIdList' });
        } else {
            shopModel.find({ "shopId": { $in: req.body.shopIdList } }, (err, data) => {

                if (err) {
                    return res.send({ success: false, msg: 'failed to find' })
                }
                else {
                    return res.send({ success: true, data })
                }
            })
        }
    },

    getBookingForAdmin: function (req, res) {
        bookingModel.find({}, async function (err, record) {
            if (!record) {
                return await res.send({ success: false, msg: 'No Record Found', data: record })
            }
            else {
                return await res.send({ success: true, msg: 'successful', data: record })
            }
        })
    },


    // updateUser: function (req, res) {
    //     User.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, user) {
    //         if (err) {
    //             return res.send({ success: false, msg: 'Failed to update or Email already exist.' })
    //         }
    //         else {
    //             res.json({ success: true, msg: 'Successfully updated' });
    //         }
    //     })
    // },

    // updateProfilePic: function (req, res) {
    //     var userId = req.body.userId
    //     var image = req.body.profileImg

    //     if (!userId || !image) {
    //         return res.send({ success: false, msg: "provide userId and profile image url" })
    //     }
    //     User.findOneAndUpdate({ userId: userId }, { $set: { profileImg: image } }, function (error, save) {
    //         if (error) {
    //             return res.send({ success: false, msg: "Failed to save image" })
    //         }
    //         else {
    //             res.json({ success: true, msg: 'Image successfully updated' });
    //         }
    //     })
    // },


    // updatePassword: function (req, res) {
    //     var newPassword = req.body.newPassword
    //     var oldPassword = req.body.oldPassword
    //     console.log(oldPassword, newPassword)
    //     if (!newPassword || !oldPassword) {
    //         return res.send({ success: false, msg: 'Provide old password and new password' })
    //     }
    //     User.findOne({ userId: req.body.userId }, function (err, user) {
    //         if (err) {
    //             return res.send({ success: false, msg: 'Invalid user id ' })
    //         }
    //         else {
    //             user.comparePassword(oldPassword, function (error, isMatch) {
    //                 if (isMatch && !err) {
    //                     user.password = newPassword
    //                     user.save()
    //                         .then((asd) => {
    //                             res.json({ success: true, msg: "successfully saved password", user })
    //                         })
    //                 } else {
    //                     return res.send({ success: false, msg: 'Authenticaton failed, wrong password.' });
    //                 }
    //             })
    //         }
    //     })
    // },

    // getByRole: function (req, res) {
    //     user.find({
    //         role: req.params.role
    //     }, function (err, user) {
    //         if (err) throw err;
    //         if (!user) {
    //             res.status(403).send({ success: false, msg: 'Role not found' });
    //         } else {
    //             res.json({ success: true, user: user });
    //         }
    //     })
    // },


    // deleteUserById: function (req, res) {
    //     var userId = req.params.userId
    //     user.findOneAndDelete({
    //         userId
    //     }, function (err, user) {
    //         if (err) throw err;
    //         if (!user) {
    //             res.status(403).send({ success: false, msg: 'user not found' });
    //         } else {
    //             res.json({ success: true, msg: "successfully deleted" });
    //         }
    //     })
    // },


};

module.exports = functions;
