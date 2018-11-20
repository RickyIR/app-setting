const QuizService = require('./../../../../services/api/quizzes.service');

module.exports = {
    get: async (req, res, next) => {
        try{

            let quizzes = await QuizService.getQuizDistincts();

            if (!quizzes){
                return res.status(200).send({message: 'Quizzes have not been found', status: 404});
            }
            
            return res.status(200).send({status: 200, data: quizzes, message: 'Quizzes have been successfully received'});
            
        }catch(e){
            return res.status(500).send({message: e.message, status: 500});
        }
    }
}