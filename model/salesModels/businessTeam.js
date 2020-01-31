let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let businessTeam = new Schema({
    name: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    gender: {
        type: String,
    },
    description: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    businessTeamId: {
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

module.exports = mongoose.model('businessTeam', businessTeam);

// var json = {
//     "name": "",
//     "profile_image": "",
//     "gender": "",
//     "description": "",
//     "phoneNumber": "",
//     "businessTeamId": "",
//     "createdById": "",
// }