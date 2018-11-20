const UserModel = require('./../../models/User.model');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

module.exports.getAuthors = async (query = '', options = {}) => {
    try{
        options.limit = options.limit || 6;
        options.page = options.page || 1;
        options.sortBy  = options.sortBy || 'name.first';

        var aggregate = UserModel.aggregate([
            {
                $match: {
                    "name.first": {
                        $regex: `^${query}`,
                        $options: 'i'
                    },
                    type: 'author'
                }
            }
        ])
        let authors = await UserModel.aggregatePaginate(aggregate, options);

        return authors;

    }catch(e){
        throw e;
    }
}

module.exports.getUser = async (id) => {
    try {
        if (!id) {
            throw Error('Id is not defined');
        }

        if(!ObjectId.isValid(id)){
            throw Error('author id is not valid');
        }

        let user = await UserModels.findById(id);

        if(!user){
            return false;
        }

        return user;
    } catch (e) {
        throw Error(e.message);
    }
}

/**
 * Gets Author Object by id
 */
module.exports.getAuthor = async (id) => {
    try {
        if (!id) {
            throw Error('Id is not defined');
        }

        if(!ObjectId.isValid(id)){
            throw Error('author id is not valid');
        }

        let author = await UserModels.findById(id);

        if(!author){
            return false;
        }

        if(author.type !== 'author'){
            return false;
        }

        return author;
    } catch (e) {
        throw Error(e.message);
    }
}

/**
 * Gets Student Object by id
 */
module.exports.getStudent = async (id) => {
    try {
        if (!id) {
            throw Error('Id is not defined');
        }

        if(!ObjectId.isValid(id)){
            throw Error('student id is not valid');
        }

        let student = await UserModels.findOne({
            _id: id,
            type: 'student'
        });

        if(!student){
            return false;
        }

        return student;
    } catch (e) {
        throw Error(e.message);
    }
}