const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const bluebird = require('bluebird');

const initMongoDb = (app) => {
    mongoose.Promise = bluebird;
    mongoose.connect(process.env.MONGODB)
        .then(()=> { console.log(`Succesfully Connected to the Mongodb Database at URL mongoDB`)})
        .catch((err)=> { console.log(`Error Connecting to the Mongodb Database at URL mongoDB: ${err.message}`)})
    mongoose.set('debug', true);
}

module.exports = initMongoDb;