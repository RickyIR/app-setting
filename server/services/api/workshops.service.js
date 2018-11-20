const _ = require('lodash');

const WorkshopsModels = require('./../../models/Workshop.model');
const ObjectId = require('mongodb').ObjectID;

module.exports.createWorkshop = async (workshop) =>{
    try {
        if (workshop.discussions && !ObjectId.isValid(workshop.discussions)){
            throw Error('Workshop Discussions is not valid');
        }
        
        if (workshop.knowledge && !ObjectId.isValid(workshop.knowledge)){
            throw Error('Workshop Knowledge is not valid');
        }

        // Splits tags and trims them
        workshop.tags = _.split(workshop.tags, ',');
        workshop.tags = _.map(workshop.tags, (item) => {
            return _.trim(item);
        });

        let newWorkshop = new WorkshopsModels();

        newWorkshop.name = workshop.title;
        newWorkshop.permalink = workshop.permalink;
        newWorkshop.description = workshop.description;
        newWorkshop.author = workshop.author;
        newWorkshop.series.name = workshop.series;
        newWorkshop.tags = workshop.tags;
        newWorkshop.discussions = (workshop.discussions ? ObjectId(workshop.discussions) : null);
        newWorkshop.knowledge = (workshop.knowledge ? ObjectId(workshop.knowledge) : null);
        newWorkshop.rating.question = workshop.ratingQuestion;
        newWorkshop.files.mp4 = workshop.mp4;
        newWorkshop.files.mp3 = workshop.mp3;
        newWorkshop.files.captions = workshop.captions;
        newWorkshop.files.transcript = workshop.transcript;
        newWorkshop.files.poster = workshop.poster;
        newWorkshop.files.resources = workshop.resources;

        let result = await newWorkshop.save();

        if (!result) {
            return false;
        }

        return true;

    }catch(e){
        throw Error(e);
    }
}

module.exports.deleteWorkshop = async (workshop_id) => {
    try{
        if (!workshop_id){
            throw Error('Workshop id is not defined.');
        }

        let workshop = await WorkshopsModels.findByIdAndRemove(workshop_id);

        return workshop;

    }catch(e){
        throw Error(e);
    }
}

module.exports.updateWorkshop = async (workshop_id, workshop) => {
    try{
        if (!workshop){
            throw Error('Workshop is not defined.');
        }
        if (!workshop_id){
            throw Error('Workshop ID is not defined.');
        }
        if(workshop.tags){
            // Splits tags and trims them
            workshop.tags = _.split(workshop.tags, ',');
            workshop.tags = _.map(workshop.tags, (item) => {
                return _.trim(item);
            });
        }
        if(workshop.permalink && _.indexOf(workshop.permalink, ' ') !== -1){
            throw Error('Workshop permalink contains spaces');
        }

        if(workshop.author && !ObjectId.isValid(workshop.author)){
            throw Error('Workshop author is not valid');
        }

        if(workshop.discussions && !ObjectId.isValid(workshop.discussions)){
            throw Error('Workshop discussions is not valid');
        }

        if(workshop.knowledge && !ObjectId.isValid(workshop.knowledge)){
            throw Error('Workshop knowledge is not valid');
        }

        let update_request = {
            name: workshop.title,
            permalink: workshop.permalink,
            description: workshop.description,
            author: workshop.author,
            'series.name': workshop.series,
            tags: workshop.tags,
            discussions: (workshop.discussions ? ObjectId(workshop.discussions) : null),
            knowledge: (workshop.knowledge ? ObjectId(workshop.knowledge) : null),
            'rating.question': workshop.ratingQuestion,
            'files.mp4': workshop.mp4,
            'files.mp3': workshop.mp3,
            'files.captions': workshop.captions,
            'files.transcript': workshop.transcript,
            'files.poster': workshop.poster,
            'files.resources': workshop.resources
        };

        for(let prop in update_request){
            if (!update_request[prop] && typeof update_request[prop] !== 'string'){
                delete update_request[prop];
            }
        }

        let updated_workshop = await WorkshopsModels.update({_id: workshop_id}, {
            $set: update_request
        });

        return updated_workshop;

    }catch(e){
        throw Error(e);
    }
}

/**
 * Get all workshops
 */
module.exports.getAllWorkshops = async () => {
    try {
        let workshops = await WorkshopsModels.aggregate([
            {
                "$lookup": {
                       from: "users",
                       localField: "author",
                       foreignField: "_id",
                       as: "author"
                     }
            },
            {
                $addFields: {
                    "author": {
                        $arrayElemAt: ["$author",0]
                    },
                    "rating.average": {
                        $cond: { 
                            if: { 
                                $gt: [
                                        {
                                            $size: "$rating.answers"
                                        }, 
                                        0
                                    ] 
                            }, 
                            then: {
                                $divide: [
                                    {
                                        $sum: "$rating.answers.stars"
                                    }, 
                                    {
                                        $size: "$rating.answers"
                                    }
                                ]
                            }, 
                            else: 0
                        }
                        
                    },
                    "rating.total": {
                        "$size": "$rating.answers"
                    },
                }
            },
            {
                "$project": {
                    "rating.answers": 0
                }
            }
        ]);

        if(!workshops || !workshops.length){
            return false;
        }

        return workshops;

    } catch (e) {
        throw Error(e.message);
    }
}

/**
 * get Workshop by ID
 * @param {ObjectID} _id workshop ID
 */
module.exports.getWorkshopById = async (_id) => {
    try{
        if(!_id){
            throw Error('Workshop id is not defined');
        }

        return await WorkshopsModels.findById(_id);
        
    }catch(e){
        throw e;
    }
}

/**
 * get Workshop by permalink
 * @param {string} permalink workshop permalink
 */
module.exports.getWorkshop = async (permalink) => {
    try{

        if(!permalink){
            throw Error('permalink is not defined');
        }

        let workshop = await WorkshopsModels.aggregate([
            {
                "$match": {
                    "permalink": permalink
                }
            },
            {
                "$lookup": {
                       from: "users",
                       localField: "author",
                       foreignField: "_id",
                       as: "author"
                     }
            },
            {
                $addFields: {
                    "author": {
                        $arrayElemAt: ["$author",0]
                    },
                    "rating.average": {
                        $cond: { 
                            if: { 
                                $gt: [
                                        {
                                            $size: "$rating.answers"
                                        }, 
                                        0
                                    ] 
                            }, 
                            then: {
                                $divide: [
                                    {
                                        $sum: "$rating.answers.stars"
                                    }, 
                                    {
                                        $size: "$rating.answers"
                                    }
                                ]
                            }, 
                            else: 0
                        }
                        
                    },
                    "rating.total": {
                        "$size": "$rating.answers"
                    },
                }
            },
            {
                "$project": {
                    "rating.answers": 0
                }
            }
        ]);

        if(!workshop || !workshop.length){
            return false;
        }

        return workshop[0];
        
    }catch(e){
        throw Error(e.message);
    }
}

module.exports.getWorkshopByKnowledge = async (quiz_group_id) => {
    try{
        if(!ObjectId.isValid(quiz_group_id)){
            throw Error('quiz_group_id is not valid');
        }

        let knowledgeWorkshops = await WorkshopsModels.findOne({
            quizzes_group: quiz_group_id
        })

        return knowledgeWorkshops;

    }catch(e){
        throw Error(e.message);
    }
}

/**
 * Gets similar workshops like workshop_id (id);
 * @param {ObjectId} id workshop id 
 * @param {Object} query - query for the similar workshops
 */
module.exports.getSimilarWorkshops = async (id, query) => {
    try{
        if(!ObjectId.isValid(id)){
            throw Error('Object id is not valid');
        }

        /**
         * Searching algorithm
         * Coming soon
         */

         /**
          * Query for the similar workshops
          */
        let similarWorkshops = await WorkshopsModels.find({
            _id: {
                $ne: id
            }
        })
        .limit((query && query.limit ? query.limit : 0));

        /**
         * Returns false if similarWorkshops are not found
         */
        if(!similarWorkshops || !similarWorkshops.length){
            return false;
        }

        return similarWorkshops;

    }catch(e){
        throw Error(e.message);
    }
}