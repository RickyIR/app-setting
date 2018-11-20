const ObjectId = require('mongodb').ObjectId;
const QuizModel = require('./../../models/Quiz.model').model;
const _ = require('lodash');
const WorkshopService = require('./workshops.service');

module.exports.getQuiz = async (quiz_group_id) => {
    try {
        if (!quiz_group_id) {
            throw Error('quiz group id is not defined.');
        }

        if (!ObjectId.isValid(quiz_group_id)){
            throw Error('quiz group id is not valid.');
        }

        let quiz = await QuizModel.aggregate([
            {
                "$match": {
                    "quizzes_group": ObjectId(quiz_group_id)
                }
            }
        ]);

        if (!quiz || !quiz.length) {
            return false;
        }

        return quiz;

    }catch(e) {
        throw Error(e.message);
    }
}

module.exports.getQuizDistincts = async () => {
    try{
        let quizzes = await QuizModel.aggregate( [
            { 
                $group : { 
                    _id : "$quizzes_group",
                    questions: { $push: "$$ROOT" }
                }
            },
            {
                $lookup: {
                   from: 'workshops',
                   localField: '_id',
                   foreignField: 'knowledge',
                   as: 'workshop'
                }
            },
            {
                $addFields: {
                    workshop: {
                        $arrayElemAt: ['$workshop', 0]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    questions: 1,
                    workshop: '$workshop.name'
                }
            }
        ]);

        if (!quizzes){
            return false;
        }

        return quizzes;
    }catch(e){
        throw Error(e.message);
    }
}

module.exports.createQuiz = async (questions) => {
    try{

        if(!questions || !questions.length){
            throw Error('Questions are not defined');
        }


        let quiz_group_id = ObjectId();
        let workshop;

        _.map(questions, (item) => {

            item.quizzes_group = quiz_group_id;
            workshop = item.workshop;

            delete item.workshop;

            return item;
        })

        if(workshop){
            let workshopCheck = await WorkshopService.getWorkshopById(workshop);

            if(workshopCheck && workshopCheck.knowledge){
                throw Error('Workshop already has a quiz. Please select another one.');
            }

            await WorkshopService.updateWorkshop(workshop, {
                knowledge: quiz_group_id
            })
        }

        let quizzes = await QuizModel.insertMany(questions);

        if (!quizzes){
            return false;
        }

        return quizzes;

    }catch(e){
        throw Error(e.message);
    }
}

module.exports.deleteQuizGroup = async (quiz_group_id) => {
    try{
        if(!quiz_group_id){
            throw Error('quiz_group_id is not defined');
        }

        if(!ObjectId.isValid(quiz_group_id)){
            throw Error('quiz_group_id is not valid');
        }

        let workshop_with_current_quiz = await WorkshopService.getWorkshopByKnowledge(quiz_group_id);

        if(workshop_with_current_quiz && workshop_with_current_quiz !== 0){
            throw Error(`Workshop '${workshop_with_current_quiz.name}' is currently using this quiz. Please remove it first`);
        }

        let quiz_deleted = await QuizModel.remove({
            quizzes_group: quiz_group_id
        });

        if(!quiz_deleted){
            return false;
        }

        return quiz_deleted;

    }catch(e){
        throw e;
    }
}