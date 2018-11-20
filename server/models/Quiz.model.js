const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


/**
 * Quiz
 */
const QuizSchema = new mongoose.Schema({
    index: Number,
    quizzes_group: mongoose.Schema.Types.ObjectId,
    question: String,
    allowTryAgain: Boolean,
    allowShowAnswer: Boolean,
    timeStamp: String,
    timeStampEnd: String,
    answers: [{
        id: Number,
        answer: String,
        isCorrect: Boolean,
        explanation: String
    }]
});

QuizSchema.plugin(mongoosePaginate);

module.exports = {
    schema: QuizSchema,
    model: mongoose.model('quiz', QuizSchema)
}