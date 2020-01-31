let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let subDetail = new Schema({
    name: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    categoryId: {
        type: String,
    },
    tranId: {
        type: String
    }
    // ObjectId: mongoose.Schema.Types.ObjectId
})


let appCategory = new Schema({
    categoryName: {
        type: String,
    },
    categoryId: {
        type: String,
    },
    categoryImg: {
        type: String,
    },
    detail: [subDetail],
    createdById: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})



module.exports = mongoose.model('appCategory', appCategory);
// var json = {
//     "categoryName": "asd",
//     "createdById": "asdd",
//     "isActive": "true",
//     "detail": [{
//         "name": "asd",
//         "isActive": "asd",
//         "categoryId": "asdd",
//     }]

// }