let businessModel = require('../../model/salesModels/businessTeam');


let functions = {
    addBusiness: function (req, res) {

        let dataToSave = businessModel({ ...req.body })
        dataToSave.save(function (err, record) {
            if (err) {
                return res.status(406).send({ success: false, msg: 'Failed to save kindly provide all fields' })
            }
            else {
                var objId = record._id.toString()
                var businessTeamId = objId.slice(objId.length - 5)
                businessModel.findByIdAndUpdate({ _id: record._id }, { $set: { businessTeamId: businessTeamId } }, function (err, doc) {
                    if (err) {
                        return res.status(406).send({ success: false, msg: 'Failed to save' })
                    }
                    else {
                        res.json({ success: true, msg: "successfully saved", data: doc })
                    }
                })
            }
        })
    },

    getAllBusinessTeam: function (req, res) {
        businessModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },

    getByBusinessTeamId: function (req, res) {
        var businessTeamId = req.params.businessTeamId
        if (!businessTeamId) {
            res.status(400).send({ success: false, msg: 'Provide businessTeamId' });
        }
        businessModel.find({ businessTeamId: businessTeamId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },



    deleteByTeamId: function (req, res) {
        var businessTeamId = req.params.businessTeamId
        if (!businessTeamId) {
            res.status(400).send({ success: false, msg: 'Provide businessTeamId' });
        }
        businessModel.findOneAndDelete({ businessTeamId: businessTeamId }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },

    updateBusiness: function (req, res) {
        var businessTeamId = req.body.businessTeamId
        if (!businessTeamId) {
            res.status(400).send({ success: false, msg: 'Provide business Team Id' });
        }
        businessModel.findOneAndUpdate({ businessTeamId: businessTeamId }, req.body, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },








};

module.exports = functions;
