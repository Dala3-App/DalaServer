let feedbackModel = require('../../model/salesModels/feedback');


let functions = {


    addFeedback: function (req, res) {
        let dataToSave = feedbackModel({ ...req.body })
        dataToSave.save(function (err, record) {
            if (err) {
                return res.send({ success: false, msg: 'Failed to save ' })
            }
            else {
                var objId = record._id.toString()
                var feedbackId = objId.slice(objId.length - 5)
                feedbackModel.findByIdAndUpdate({ _id: record._id }, { $set: { feedbackId: feedbackId } }, function (err, data) {
                    if (err) {
                        return res.send({ success: false, msg: 'Failed to save' })
                    }
                    else {
                        res.json({ success: true, msg: "successfully saved", data })
                    }
                })
            }
        })
    },


    getAllFeedback: function (req, res) {
        feedbackModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, msg: 'successfully fetched', data });
            }
        })
    },

    getAllFeedbackByCreatedById: function (req, res) {
        var createdById = req.params.createdById
        feedbackModel.findOne({ createdById: createdById }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, msg: 'successfully fetched', data });
            }
        })
    },




};

module.exports = functions;
