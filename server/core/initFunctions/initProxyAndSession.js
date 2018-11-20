const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

exports = module.exports = async (app) => {
    try{
        if(!process.env.COOKIE_SECRET){
            throw Error('Cookie secret is not defined');
        }

        if(!process.env.MONGODB){
            throw Error('MongoDB url is not defined');
        }

        app.set('trust proxy', 'loopback');
        app.use(session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: true,
            store: new MongoStore({url: process.env.MONGODB}),
            cookie: {
                maxAge: 1000,
                expires: 1000,
                secure: false,
                httpOnly: false
            }
        }));

        return 'Proxy and Session have been initialized';

    }catch(e){
        e.type = 'initProxyAndSession';
        throw e;
    }
}