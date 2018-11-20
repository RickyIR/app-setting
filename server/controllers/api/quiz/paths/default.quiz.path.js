const QuizzesService = require('./../../../../services/api/quizzes.service');

exports = module.exports = {
    get: async (req, res, next) => {



        return res.status(200).send({status: 200, data: 'all good', message: 'Questions have been successfully received.'})
    },
    post: async (req, res, next) => {
        try{
            if (!req.body || !req.body.length){
                throw Error('questions are not defined');
            }

            let result = await QuizzesService.createQuiz(req.body);

            if (!result){
                return res.status(200).send({status: 404, message: 'Quiz has not been created'});
            }

            return res.status(200).send({status: 201, message: 'Quiz has been created'});

        }catch(e){
            return res.status(500).send({status: 500, message: e.message});
        }
    }
}