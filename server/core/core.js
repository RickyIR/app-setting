const initDefault = (app) => {
    /**
     * Modules to be initialized
     */
    var modulesToInit = {
        initMongoDb: require('./initFunctions/initMongoDb'),
        initEnvironment: require('./initFunctions/initEnvironment'),
        initParsers: require('./initFunctions/initParsers'),
        initLogger: require('./initFunctions/initLogger'),
        initProxyAndSession: require('./initFunctions/initProxyAndSession')
    }

    /**
     * For each module => runs default function
     */
    for(let initModule in modulesToInit){
        modulesToInit[initModule].call(null, app);
    }
}

module.exports = {
    initDefault: initDefault
}