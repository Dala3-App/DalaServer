let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let country = new Schema({
    countryName: {
        type: String,
        required: true,
        unique: true
    },
    countryId: {
        type: String,
    },
    createdById: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('country', country);

// var json = {
//   "cityName": "",
//   "createdById": "",

// }

