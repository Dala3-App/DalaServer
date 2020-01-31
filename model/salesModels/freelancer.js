let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let freelancer = new Schema({
    bussiness_name: {
        type: String,
    },
    typeOfBusiness: {
        type: String,
    },
    no_of_employee: {
        type: String,
    },
    freelancerId: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    website_social: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email_address: {
        type: String,
    },
    contact_number: {
        type: String,
    },
    how_you_find: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('freelancer', freelancer);
// var json = {
//     "bussiness_name": "",
//     "typeOfBusiness": "",
//     "no_of_employee": "",
//     "address": "",
//     "postalCode": "",
//     "website_social": "",
//     "first_name": "",
//     "last_name": "",
//     "email_address": "",
//     "contact_number": "",
//     "how_you_find": "",
// }