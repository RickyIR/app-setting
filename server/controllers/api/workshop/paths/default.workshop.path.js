const WorkshopsService = require('./../../../../services/api/workshops.service');

const _ = require('lodash');

/**
 * api..../workshops/
 */
exports = module.exports = {
    get: async (req, res, next) => {

        try {
            /**
             * Gets list of all workshops
             */
            const allWorkshops = await WorkshopsService.getAllWorkshops();

            if (!allWorkshops) {
                return res.status(200).send({status: 404, message: 'No workshops are found.'});
            }

            return res.status(200).send({status: 200, message: 'Workshops have been successfully received.', data: allWorkshops});

        } catch (e) {
            return res.status(500).send({status: 500, message: e.message});
        }
        
    },
    post: async (req, res, next) => {
        try {
            /**
             * Create new workshop
             */
            if (!req.body){
                throw Error('Workshop\'s information has not been received. Please try again.');
            }

            const workshop = await WorkshopsService.createWorkshop(req.body);

            if (!workshop){
                return res.status(200).send({status: 404, message: 'Workshop has not been created. Please try again later.'});
            }

            res.status(200).send({status: 201, message: 'Workshop has been successfully created'});

        }catch(e){
            return res.status(500).send({status: 500, message: e.message});
        }
    }
}