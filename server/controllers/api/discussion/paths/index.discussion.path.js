const DiscussionsService = require('./../../../../services/api/discussions.service');

exports = module.exports = {
    get: async (req, res, next) => {

        try {
            if (!req.params || !req.params.discussions_group_id) {
                throw Error('discussions_group_id id is not defined');
            }

            let discussions = await DiscussionsService.getDiscussionsByGroupId(req.params.discussions_group_id);

            if (!discussions) {
                return res.status(200).send({status: 404, message: 'Discussions have not been found.'});
            }

            return res.status(200).send({status: 200, data: discussions, message: 'Discussions have been successfully received.'})

        }catch(e) {
            return res.status(500).send({status: 500, message: e.message});
        }
    }
}