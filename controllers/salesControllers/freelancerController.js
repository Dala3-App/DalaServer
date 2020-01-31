let freelancerModel = require('../../model/salesModels/freelancer');


let functions = {
    addFreelancer: function (req, res) {

        let dataToSave = freelancerModel({ ...req.body })
        dataToSave.save(function (err, record) {
            if (err) {
                return res.status(406).send({ success: false, msg: 'Failed to save ' })
            }
            else {
                var objId = record._id.toString()
                var freelancerId = objId.slice(objId.length - 5)
                freelancerModel.findByIdAndUpdate({ _id: record._id }, { $set: { freelancerId: freelancerId } }, function (err, doc) {
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

    getAllFreeLancer: function (req, res) {
        freelancerModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },

    getByIdFreelancer: function (req, res) {
        var freelancerId = req.params.freelancerId
        if (!freelancerId) {
            res.status(400).send({ success: false, msg: 'Provide created by id' });
        }
        freelancerModel.find({ freelancerId: freelancerId }, function (err, data) {
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
