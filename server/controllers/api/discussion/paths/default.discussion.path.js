exports = module.exports = {
    get: async (req, res, next) => {
        return res.status(200).send({status: 200, data: 'all good', message: 'Quizzes have been successfully received.'})
    }
}