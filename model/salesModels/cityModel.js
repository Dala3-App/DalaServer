let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let city = new Schema({
    cityName: {
        type: String,
        required: true,
        unique: true
    },
    cityId: {
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
    countryId: String
})

module.exports = mongoose.model('city', city);

// var json = {
//   "cityName": "",
//   "createdById": "",

// }

