let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let package = new Schema({
    packageName: {
        type: String,
        required: true,
        unique: true
    },
    packagePrice: {
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
    packageDuration: {
        type: String
    },

    packageType: {
        type: String
    },
    packageId: {
        type: String
    },

})

module.exports = mongoose.model('package', package);

// var json = {
//     "packageName": "",
//     "packagePrice": "",
//     "packageDuration": "",
//     "packageType": "",
//     "createdById": ""
// }



