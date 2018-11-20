const QuizService = require('./../../../../services/api/quizzes.service');

exports = module.exports = {
    get: async (req, res, next) => {

        try {
            if (!req.params || !req.params.quiz_group_id) {
                throw Error('quiz group id is not defined');
            }

            let quizzes = await QuizService.getQuiz(req.params.quiz_group_id);

            if (!quizzes) {
                return res.status(200).send({status: 404, message: 'Quiz has not been found.'});
            }

            return res.status(200).send({status: 200, data: quizzes, message: 'Quiz has been successfully received.'})

        }catch(e) {
            return res.status(500).send({status: 500, message: e.message});
        }
    },
    delete: async (req, res, next) =>{
        try{
            if(!req.params || !req.params.quiz_group_id){
                throw Error('quiz group id is not defined');
            }

            let quiz = await QuizService.deleteQuizGroup(req.params.quiz_group_id);

            if (!quiz){
                return res.status(200).send({status: 404, message: 'Quiz is not found'});
            }

            return res.status(200).send({status: 204, message: 'Quiz has been successfully delete.'});

        }catch(e){
            return res.status(500).send({status: 500, message: e.message});
        }
    }
}