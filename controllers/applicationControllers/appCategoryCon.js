let categoryModel = require('../../model/applicationModels/appCategory');

let functions = {

    // authenticate: function (req, res) {
    //     console.log(req.body);
    //     User.findOne({
    //         email: req.body.email
    //     }, function (err, user) {
    //         if (err) throw err;

    //         if (!user) {
    //             res.status(403).send({ success: false, msg: 'Authentication failed, User not found' });
    //         } else {
    //             user.comparePassword(req.body.password, function (err, isMatch) {
    //                 if (isMatch && !err) {
    //                     let token = jwt.encode(user, config.secret);
    //                     res.json({
    //                         success: true,
    //                         token: "JWT " + token,
    //                         user: user
    //                     });
    //                 } else {
    //                     return res.status(403).send({ success: false, msg: 'Authenticaton failed, wrong password.' });
    //                 }
    //             })
    //         }
    //     })
    // },
    addNewCategory: function (req, res) {
        if ((!req.body)) {
            res.json({ success: false, msg: 'Enter all values' });
        }
        else {
            let category = categoryModel({ ...req.body });
            category.save(function (err, record) {
                if (err) {
                    return res.status(406).send({ success: false, msg: 'Failed to save', err })
                }
                else {
                    var objId = record._id.toString()
                    var categoryId = objId.slice(objId.length - 6)
                    categoryModel.findById({ _id: record._id }, function (err, data) {
                        if (err) {
                            return res.status(406).send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            data.categoryId = categoryId
                            var detail = data.detail

                            if (detail[0] != undefined) {
                                data.detail.map((obj) => {
                                    var newTranId = obj._id.toString()
                                    obj.categoryId = categoryId
                                    obj.tranId = newTranId.slice(objId.length - 6)
                                })
                            }
                            categoryModel.findByIdAndUpdate({ _id: data._id }, data, function (error, savedData) {
                                if (error) {
                                    res.json({ success: false, error })
                                }
                                else {
                                    res.json({
                                        success: true,
                                        msg: 'Successfully saved',
                                        detail: savedData
                                    })

                                }
                            })

                        }
                    })
                }
            })
        }
    },




    getAllCategory: function (req, res) {
        categoryModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'Authentication failed, Profile not found' });
            } else {
                res.json({ success: true, data });
            }
        })
    },

    updateCategory: function (req, res) {
        categoryModel.findOneAndDelete({ categoryId: req.body.categoryId }, req.body, function (err, saved) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to update ' })
            }
            else {
                res.json({ success: true, msg: 'Successfully updated', data: saved });
            }
        })
    },

    deleteCategory: function (req, res) {
        categoryModel.findByIdAndDelete({ categoryId: req.params.categoryId }, req.body, function (err, saved) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to delete ' })
            }
            else {
                res.json({ success: true, msg: 'Successfully deleted', data: saved });
            }
        })
    }
};

module.exports = functions;
