const WorkshopsService = require('./../../../../services/api/workshops.service');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

exports = module.exports = {
    get: async (req, res, next) => {
        try{
            let query = {};
            if(!req.params.workshop_id){
                throw Error('workshop id is not defined');
            }

            if(!ObjectId.isValid(req.params.workshop_id)){
                throw Error('workshop id is not valid.');
            }

            if(req.query){
                /**
                 * If limit is defined, sets it in query
                 */
                if(req.query.limit){
                    query.limit = _.toNumber(req.query.limit);
                }
            }

            let similarWorkshops = await WorkshopsService.getSimilarWorkshops(req.params.workshop_id, query);

            if(!similarWorkshops){
                return res.status(200).send({status: 404, message: `Similar workshops have not been found`});
            }

            /**
             * Removes mongoose Model in order to add new properties (rating, author ...)
             */

            /**
             * Removes mongoose properties and puts it in data array
             * Allows to change the object (or add new properties)
             */

            let data = [];

            _.flatMap(similarWorkshops, (item) => {
                data.push(item.toObject());
            });

            /**
             * if extra_parameters are defined, gets info about it
             */
            if (req.query){
                if(req.query.ex){
                    const extra_parameters = _.split(req.query.ex, '|');

                    data = await WorkshopsService.getExtraParameters(data, extra_parameters);
                }
            }

            return res.status(200).send({status: 200, message: 'Similar workshops have been successfully received.', data: data});


        }catch(e){
            console.log(e);
            return res.status(500).send({message: e.message, status: 500});
        }
    }
}