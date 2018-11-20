const mongoose = require('mongoose');
const paginate = require('mongoose-aggregate-paginate');


/**
 * Author
 */
const UserSchema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    type: String,
    permalink: String,
    date: {
        created: Date,
        last_visit: Date
    },
    image: {
        url: String,
        alt: String
    }
});

UserSchema.plugin(paginate);

module.exports = mongoose.model('Users', UserSchema);