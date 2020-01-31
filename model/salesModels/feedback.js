let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let feedback = new Schema({
    comments: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
    },
    ownerName: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    rating: {
        type: String,
    },
    feedbackId: {
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
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

module.exports = mongoose.model('feedback', feedback);


// var json = {
//     "comments": "",
//     "shopName": "",
//     "ownerName": "",
//     "address": "",
//     "phoneNumber": "",
//     "rating": "",
//     "userName": "",
//     "userEmail": "",
//     "createdById": ""
// }