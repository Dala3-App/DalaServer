let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let typeOfBusines = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tranId: {
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




module.exports = mongoose.model('typeOfBusines', typeOfBusines);

// var json = {
//   "name": "",
//   "createdById": "",

// }

