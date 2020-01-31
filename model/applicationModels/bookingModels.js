let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let cardInfo = new Schema({

    cardNumber: {
        type: String,
    },
    cardHolderName: {
        type: String,
    },
    expireDate: {
        type: String,
    },
    cvv: {
        type: String,
    },
    userId: String

})

let serviceProvider = new Schema({
    name: String,
    userId: String,
    profileImage: String,
    description: String,
    price: String,

})


let bookings = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isVisited: {
        type: String,
    },

    emailSubsciption: {
        type: String,
    },
    serviceSubscription: {
        type: String,
    },
    serviceId: [{
        type: String,
    }],

    serviceProvider: serviceProvider, //jis say service karwani hai
    subCategoryId: {
        type: String,
    },
    bookingId: {
        type: String,
    },
    createdById: {
        type: String,
        required: true
    },
    shopId: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isActive: Boolean,
    isDeleted: Boolean,
    servicesDate: String,
    serviceTime: String,
    bookingPrice: String,
    cardInfo: cardInfo,
    isSaveCardDetail: Boolean,
    status: String
})

module.exports = mongoose.model('booking', bookings);
// var json = {
//     "email": "",
//     "fullName": "",
//     "phone": "",
//     "isVisited": "",
//     "emailSubsciption": "",
//     "serviceSubscription": "",
//     "subCategoryId": "",
//     "shopId": "",
//     "serviceId": "",
//     "cardInfo": {
//         "cardNumber": "",
//         "cardHolderName": "",
//         "expireDate": "",
//         "cvv": "",
//         "userId": ""
//     },
//     "isActive": "",
//     "isDeleted": "",
//     "servicesDate": "",
//     "serviceTime": "",
//     "bookingPrice": "",
//     "isSaveCardDetail": "",
//     "serviceProvider": {
//         "name": "",
//         "userId": ""
//     },
//     "createdById":"",

// }