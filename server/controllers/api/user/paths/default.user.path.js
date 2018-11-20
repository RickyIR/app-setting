const UserService = require('./../../../../services/api/users.service');

module.exports = {
    get: async (req, res, next) => {
        try {
            let authors = await UserService.getAuthors(req.query.q);

            return res.status(200).send(authors);;

        }catch(e){
            return res.status(200).send({status: 500, message: e.message});
        }
    }
}