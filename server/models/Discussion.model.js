const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = require('./User.model').schema;


/**
 * Discussions
 */
const DiscussionSchema = new mongoose.Schema({
    discussions_group: String,
    title: String,
    permalink: Boolean,
    user: UserSchema,
    date: {
        created: Date,
        last_answer: Date
    }
});

DiscussionSchema.plugin(mongoosePaginate);

module.exports = {
    schema: DiscussionSchema,
    model: mongoose.model('discussion', DiscussionSchema)
}