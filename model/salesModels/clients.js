let mongoose = require('mongoose');
let Schema = mongoose.Schema;



const registerdIn = new Schema({

})


let client = new Schema({
    userId: String,
    registerdIn,
    reviews: String,
    rating: String,
    description: String
})

module.exports = mongoose.model('client', client);

