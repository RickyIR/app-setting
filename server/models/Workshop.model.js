const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

/**
 * Workshop Schema
 */
const WorkshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workshop Title is not defined.']
    },
    description: {
        type: String,
        required: [true, 'Workshop Description is not defined.']
    },
    permalink: {
        type: String,
        required: [true, 'Workshop URL is not defined.'],
        validate: [{
            validator: async (v) => {

                console.log(v);

                let workshops = await Workshop.find({permalink: v});

                if (workshops && workshops.length !== 0){
                    throw Error();
                }
            },
            message: 'Workshop already exists!'
          },
        {
            validator: (v) => {
                if(_.indexOf(v, ' ') !== -1){
                    throw Error();
                }
            },
            message: 'Workshop URL contains spaces'
        }]
    },
    date: {
        created: {
            type: Date,
            default: new Date()
        }
    },
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Workshop Author is not defined'],
        validate: {
            validator: (v) => {
                if (!ObjectId.isValid(v)){
                    throw Error();
                }
            },
            message: 'Workshop Author is not valid.'
        }
    },
    series: {
        _id: String,
        name: {
            type: String,
            required: [true, 'Workshop Serie is not defined']
        },
        workshops: [String]
    },
    tags: {
        type: [String],
        default: []
    },
    discussions: mongoose.Schema.Types.ObjectId,
    knowledge: mongoose.Schema.Types.ObjectId,
    downloads: {
        type: [String],
        default: []
    },
    rating: {
        question: {
            type: String,
            required: [true, 'Workshop Rating Question is not defined']
        },
        limit: {
            type: Number,
            default: 600
        },
        answers: {
            type: [{
                user: String,
                content: String,
                stars: Number
            }],
            default: []
        }
    },
    files: {
        resources: {
            type: String
        },
        mp4: {
            type: String,
            required: [true, 'Workshop Files MP4 is not defined']
        },
        mp3: {
            type: String,
            required: [true, 'Workshop Files MP3 is not defined']
        },
        transcript: {
            type: String,
            required: [true, 'Workshop Files Transcript is not defined']
        },
        transcript_pdf: String,
        poster: {
            type: String,
            required: [true, 'Workshop Files Poster is not defined']
        },
        captions: {
            type: String,
            required: [true, 'Workshop Files Captions is not defined']
        }
    }
});

WorkshopSchema.plugin(mongoosePaginate);

module.exports = Workshop = mongoose.model('Workshop', WorkshopSchema)