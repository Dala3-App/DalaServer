let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let location = new Schema({

    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },

})
let serviceDetail = new Schema({

    name: {
        type: String,
    },
    time: {
        type: String,
    },
    cost: {
        type: String,
    },

})


let employeeDetail = new Schema({

    name: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    userId: String

})


let service = new Schema({

    categoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    subCategoryName: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: String,
        required: true
    },

    serviceName: {
        type: String,
    },
    description: {
        type: String,
    },
    cost: {
        type: String,
    },
    tax: {
        type: String,
    },
    location: location,

    openShopTime: {
        type: String,
    },
    rating: {
        type: String,
    },
    serviceImage: {
        type: String,
    },
    discount: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    shopId: {
        type: String,
    },
    serviceId: {
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
    isActive: Boolean,
    isDeleted: Boolean,
    reviews: String,
    servicesTime: String,
    servicesEmployee: [employeeDetail],
    serviceDetail: [serviceDetail],
    restriction :String
})

module.exports = mongoose.model('service', service);

// var json = {
//     "categoryName": "",
//     "categoryId": "",
//     "subCategoryName": "",
//     "subCategoryId": "",
//     "serviceName": "",
//     "description": "",
//     "cost": "",
//     "tax": "",
//     "openShopTime": "",
//     "rating": "",
//     "serviceImage": "",
//     "discount": "",
//     "contactNumber": "",
//     "address": "",
//     "shopId": "",
//     "serviceId": "",
//     "createdById": "",
//     "isActive": "",
//     "isDeleted": "",
//     "location": {
//         "latitude": "",
//         "longitude": ""
//     },
//      "reviews":""
// }


// var servicesEmployee = [{
//     "name": "sabih siddiqui",
//     "price": "",
//     "description": "",
//     "profileImage": "a70290b5dd4021e837e9ae99dc5135a9.png",
//     "userId": "9d399",
// },
// {
//     "name": "sabih",
//     "price": "",
//     "description": "this is some description",
//     "profileImage": "29ac0f746f9fb361f74c97e0962a363e.jpg",
//     "userId": "0eeaf",
// }]
// serviceDetail={

//     "name" :"wahan massage",
//     "serviceTime" :"2h 30m",
//     "cost":"29"
// }