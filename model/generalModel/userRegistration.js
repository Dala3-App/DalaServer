let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');




let registeredIn = new Schema({
    shopId: String,
    shopName: String,
    isRegisterFee: Boolean,
    isActive: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    },
})

let additionalInfo = new Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    telephone: String,
    email: String,
    gender: String,
    reference: String,
    birthday: String,
    note: String,
})



let location = new Schema({
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }
})


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


let user = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    createdById: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
    },
    verification_code: {
        type: String
    },
    profileImg: {
        type: String,
    },
    emialSubscription: {
        type: Boolean,
    },
    phone: {
        type: String,
    },
    serviceSubscription: {
        type: Boolean,
    },
    location: location,
    isVerified: {
        type: Boolean,
    },
    isVisited: {
        type: Boolean,
    },
    isDeleted: {
        type: Boolean,
    },
    cardInfo: cardInfo,
    isCardSaved: Boolean,
    registeredIn: [registeredIn],
    additionalInfo: [additionalInfo]
})


user.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

user.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('user', user);


// var json = {
//     "username": "",
//     "email": "",
//     "isActive": "",
//     "createdById": "",
//     "role": "",
//     "verification_code": "",
//     "profileImg": "",
//     "emialSubscription": "",
//     "phone": "",
//     "serviceSubscription": "",
//     "isVerified": "",
//     "isVisited": "",
//     "isDeleted": "",
//     "cardInfo": {
//         "cardNumber": "",
//         "cardHolderName": "",
//         "expireDate": "",
//         "cvv": "",
//         "userId": ""
//     },
//     "additionalInfo": {
//         "firstName": "",
//         "lastName": "",
//         "Mobile": "",
//         "telephone": "",
//         "email": "",
//         "gender": "",
//         "reference": "",
//         "birthday": "",
//         "note": ""
//     },
//     "registeredIn": [{
//         "shopId": "",
//         "shopName": "",
//         "isRegisterFee": "",
//         "isActive": ""
//     }],
//     "location": {
//         "latitude": "",
//         "longitude": ""
//     }
// }

