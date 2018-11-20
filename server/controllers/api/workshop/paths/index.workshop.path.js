const WorkshopsService = require('./../../../../services/api/workshops.service');

/**
 * api..../workshops/ID
 */
exports = module.exports = {
    get: async (req, res, next) => {
        try{
            if (!req.params || !req.params.workshop_id) {
                throw Error('Workshop name is not defined');
            }


            let workshop = await WorkshopsService.getWorkshop(req.params.workshop_id);
            
            if (!workshop){
                return res.status(200).send({status: 404, message: 'Workshop is not found. Please try again.'});
            }

            return res.status(200).send({status: 200, data: workshop, message: 'workshops have been successfully received.'});

        } catch (e) {
            return res.status(500).send({message: e.message, status: 500});
        }
    },
    delete: async (req, res, next) => {
        try{
            if (!req.params || !req.params.workshop_id){
                throw Error('Workshop id is not defined');
            }

            let workshop = await WorkshopsService.deleteWorkshop(req.params.workshop_id);

            if (!workshop){
                return res.status(200).send({status: 404, message: 'Workshop has not been found.'});
            }

            return res.status(200).send({status: 204, message: 'Workshop has been successfully deleted.'});


        }catch(e){
            return res.status(500).send({message: e.message, status: 500});
        }
    },
    put: async (req, res, next) => {
        try{
            if (!req.params || !req.params.workshop_id){
                throw Error('Workshop id is not defined');
            }

            if(!req.body){
                throw Error('Updated values are not defined.');
            }

            let workshop = await WorkshopsService.updateWorkshop(req.params.workshop_id, req.body);

            if (!workshop){
                return res.status(200).send({status: 404, message: 'Workshop has not been found.'});
            }

            return res.status(200).send({status: 204, message: 'Workshop has been successfully updated.'});

        }catch(e){
            console.log(e);
            return res.status(500).send({message: e.message, status: 500});
        }
    }
}