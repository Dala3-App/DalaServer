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
let menu = new Schema({
    categoryName: {
        type: String,
    },
    categoryId: {
        type: String,
    },
})

let availablity = new Schema({
    check: Boolean,
    dayName: String,
    openTime: String,
    closeTime: String,
    isActive: Boolean
})

let shopRegister = new Schema({
    firsName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone_number: {
        type: String,
    },
    city: {
        type: String,
    },
    cityId: {
        type: String,
    },
    country: String,
    countryId: String,
    address: {
        type: String,
    },
    emiratesId: {
        type: String,
    },
    emiratesIdImage: {
        type: String,
    },
    business_name: { //shop name hai yai
        type: String,
    },

    number_of_employee: {
        type: String,
    },

    business_city: {
        type: String,
    },
    business_address: {
        type: String,
    },

    business_phone: {
        type: String,
    },
    license_number: {
        type: String,
    },
    business_email: {
        type: String,
    },
    billing: { //
        type: String,
    },
    typeof_business: { //
        type: String,
    },
    shopId: {
        type: String
    },
    createdById: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    packageId: {
        type: String,
    },
    packageName: {
        type: String,
    },
    termsCondition: {
        type: String,
    },
    verification_code: {
        type: String
    },
    location: location,
    profileImg: {
        type: String
    },
    role: {
        type: String
    },
    userId: String,
    isActive: Boolean,
    menu: [menu],
    reviews: String,
    rating: String,
    description: String,
    availablity: [availablity]
})

module.exports = mongoose.model('shop', shopRegister);


// var adb = {

//     "firsName": "",
//     "lastName": "",
//     "email": "",
//     "phone_number": "",
//     "city": "",
//     "address": "",
//     "emiratesId": "",
//     "emiratesIdImage": "",
//     "business_name": "",
//     "number_of_employee": "",
//     "business_city": "",
//     "business_address": "",
//     "business_phone": "",
//     "license_number": "",
//     "business_email": "",
//     "billing": "",
//     "typeof_business": "",
//     "createdById": "",
//     "packageId": "",
//     "packageName": "",
//     "termsCondition": "",
//     "verification_code": "",
//     "latitude": "",
//     "longitude": "",
//     "profileImg": "",
//     "role": "",
//     "isActive": "",
//     "reviews": "",
//     "rating": "",
// }