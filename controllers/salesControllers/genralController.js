let contactModel = require('../../model/salesModels/contactUs');


let functions = {
    addContactUs: function (req, res) {

        let dataToSave = contactModel({ ...req.body })
        dataToSave.save(function (err, record) {
            if (err) {
                return res.status(406).send({ success: false, msg: 'Failed to save kindly provide all fields' })
            }
            else {
                var objId = record._id.toString()
                var contactUsId = objId.slice(objId.length - 5)
                contactModel.findByIdAndUpdate({ _id: record._id }, { $set: { contactUsId: contactUsId } }, function (err, doc) {
                    if (err) {
                        return res.status(406).send({ success: false, msg: 'Failed to save' })
                    }
                    else {
                        res.json({ success: true, msg: "successfully sent", data: doc })
                    }
                })
            }
        })
    },

    getAllContactDetails: function (req, res) {
        contactModel.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(403).send({ success: false, msg: 'No record found' });
            } else {
                res.json({ success: true, data: data });
            }
        })
    },

    getByCreatedByContact: function (req, res) {
        var createdById = req.params.createdById
        if (!createdById) {
            res.status(400).send({ success: false, msg: 'Provide created by id' });
        }
        contactModel.find({ createdById: createdById }, function (err, data) {
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
