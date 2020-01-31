let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let reason = new Schema({
    findReason: {
        type: String,
        required: true,
    },
    reasonId: {
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

module.exports = mongoose.model('reason', reason);

// var json = {
//   "findReason": "",
//   "createdById": "",

// }

