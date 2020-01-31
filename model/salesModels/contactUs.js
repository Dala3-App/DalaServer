let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let contactUs = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    },
    contactUsId: {
        type: String,
    },
    createdById: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contactUs', contactUs);

// var json = {
//     "name": "",
//     "email": "",
//     "message": "",
//     "createdById": ""
// }