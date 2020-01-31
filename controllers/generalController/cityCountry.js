let cityModel = require('../../model/salesModels/cityModel');
let countryModel = require('../../model/salesModels/countryModel');


let functions = {


    addNewCity: function (req, res) {
        if ((!req.body.cityName) || (!req.body.createdById)) {
            res.json({ success: false, msg: 'Enter all values' });
        }
        else {

            var newCity = cityModel({ ...req.body })

            newCity.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'can not add new city', err })
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
                                data: doc
                            })
                        }
                    })
                }
            })
        }
    },

    addNewCountry: function (req, res) {
        if ((!req.body.countryName) || (!req.body.createdById)) {
            res.json({ success: false, msg: 'Enter all values' });
        }
        else {
            var newCity = countryModel({ ...req.body })
            newCity.save(function (err, data) {
                if (err) {
                    return res.send({ success: false, msg: 'can not add new country', err })
                }
                else {
                    var objId = data._id.toString()
                    var countryId = objId.slice(objId.length - 5)
                    countryModel.findByIdAndUpdate({ _id: data._id }, { $set: { countryId: countryId } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, msg: 'Failed to save' })
                        }
                        else {
                            res.json({
                                success: true,
                                msg: 'Successfully saved',
                                data: doc
                            })
                        }
                    })
                }
            })
        }
    },



    getAllCountry: function (req, res) {
        countryModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: false, msg: 'country not found' });
            } else {
                res.json({ success: true, data });
            }
        })
    },

    getCityByCountryId: function (req, res) {
        var countryId = req.params.countryId
        cityModel.find({ countryId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: false, msg: 'city not found' });
            } else {
                res.json({ success: true, data });
            }
        })
    },

};

module.exports = functions;
