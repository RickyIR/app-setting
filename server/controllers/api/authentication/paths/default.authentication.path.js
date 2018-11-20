module.exports = {
    get: async(req, res, next) => {
        try{
            if(req.session && req.session.logged){
                return res.status(200).send({status: 200});
            }

            return res.status(200).send({status: 401, message: 'Not Authorized'});
            
        }catch(e){
            return res.status(500).send({message: e.message});
        }
    },
    post: async (req, res, next) => {
        try{
            if(!req.body){
                throw Error('Bodyparser is not working properly.');
            }

            if(!req.session){
                throw Error('Session has not been created!');
            }

            if(req.body.password && req.body.password == '700elm'){
                req.session.logged = true;
                req.session.cookie._expires = 1000 * 60 * 60 * 5;
                req.session.cookie.maxAge =  1000 * 60 * 60 * 5;

                return res.status(200).send({status: 200, data: {expiresIn: 1000 * 60 * 60 * 5, sessionID: req.sessionID}, message: 'Authorized'});
            }

            if(req.body.password && req.body.password == '700elmWin'){
                req.session.logged = true;
                req.session.cookie._expires = 1000 * 60 * 60 * 5;
                req.session.cookie.maxAge =  1000 * 60 * 60 * 5;
                req.session.isAuthor = true;

                return res.status(200).send({status: 200, data: {expiresIn: 1000 * 60 * 60 * 5, sessionID: req.sessionID, isAuthor: true}, message: 'Authorized as an Author'});
            }

            return res.status(200).send({status: 404, message: 'Password is incorrect'});

        }catch(e){
            return res.status(500).send({message: e.message});
        }
    }
}