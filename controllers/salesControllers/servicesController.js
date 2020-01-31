let serviceModel = require('../../model/salesModels/services');


let functions = {
    addService: function (req, res) {
        let dataToSave = serviceModel({ ...req.body })
        dataToSave.save(function (err, record) {
            if (err) {
                return res.status(406).send({ success: false, msg: 'Failed to save kindly provide all fields', err })
            }
            else {
                res.json({ success: true, msg: "successfully saved", data: doc })
            }
        })
    },

    getAllServices: function (req, res) {
        serviceModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },

    getByServiceId: function (req, res) {
        var serviceId = req.params.serviceId
        if (!serviceId) {
            res.status(400).send({ success: false, msg: 'Provide service Id' });
        }
        serviceModel.find({ serviceId: serviceId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },



    deletByServiceId: function (req, res) {
        var serviceId = req.params.serviceId
        if (!serviceId) {
            res.status(400).send({ success: false, msg: 'Provide service id' });
        }
        res.json({ success: true, data: data });

    },

    updateServices: function (req, res) {
        var serviceId = req.body.serviceId
        if (!serviceId) {
            res.status(400).send({ success: false, msg: 'Provide created by id' });
        }
        serviceModel.findOneAndDelete({ serviceId: serviceId }, req.body, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },



    getServiceByCategory: function (req, res) {
        var categoryId = req.params.categoryId
        var subCatId = req.params.subCatId
        if (!categoryId || !subCatId) {
            res.send({ success: false, msg: 'Provide proper ids ' });
        }
        serviceModel.find({ categoryId: categoryId, subCategoryId: subCatId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: true, data: [] });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },



    getServiceByOnlyCategoryAndShopId: function (req, res) {
        var categoryId = req.params.categoryId
        var shopId = req.params.shopId
        var dataWithCategoryId = {
            categoryId: categoryId,
            shopId: shopId
        }
        var allData = {
            shopId: shopId
        }
        serviceModel.find(categoryId == 0 ? allData : dataWithCategoryId, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: true, data: [] });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },


    getServiceByCategoryAndShopId: function (req, res) {
        var categoryId = req.params.categoryId
        var subCatId = req.params.subCatId
        var shopId = req.params.shopId
        if (!categoryId || !subCatId || !shopId) {
            res.send({ success: false, msg: 'Provide proper ids ' });
        }
        serviceModel.find({ categoryId: categoryId, subCategoryId: subCatId, shopId: shopId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: true, data: [] });
            } else {
                res.json({ success: true, data: [data] });
            }
        })
    },


    getByUserId: function (req, res) {

        var userId = req.params.userId
        serviceModel.find({ createdById: userId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: true, data: [] });
            } else {
                res.json({ success: true, data: data });
            }
        })
    }

    // filterService: function (req, res) {


    //     // lat long 

    //     var date = req.body.openShopTime


    //     var address = req.body.address
    //     var address = req.body.address


    //     serviceModel


    // }



};

module.exports = functions;
