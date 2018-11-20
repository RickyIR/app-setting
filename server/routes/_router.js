module.exports = {
    /**
     * The function that initializes all routes (directories and paths)
     */
    init: (app, prefix, controller) => {
        
        prefix = prefix ? prefix + '/' : '';

        try{
            if(!controller){
                throw Error('controller should be defined');
            }

            /**
             * For each directory, that has been specified in controller
             */
            for(let directory in controller){
                /**
                 * Gets the custom URL of the directory
                 */
                let directory_url = controller[directory].url;

                /**
                 * Throw an error if no custom URL is specified
                 * ** The index directory must be without a custom URL
                 */
                if(!directory_url && directory !== 'index'){
                    throw Error(`The URL of the directory is not specified`);
                }

                /**
                 * Throw an error if pages are not defined
                 * ** At least default page should be defined
                 */
                if(!controller[directory].paths){
                    throw Error(`Directories are not defined`);
                }

                /**
                 * For each page that has been specified
                 */
                for(let path in controller[directory].paths){

                    /**
                     * Gets the custom URL of the page
                     */
                    let paths_url = controller[directory].paths[path].url;

                    /**
                     * Throw an error if no custom URL is specified
                     * ** Custom url is not required for default pages
                     */
                    if(!paths_url && path !== 'default'){
                        throw Error(`The URL of the page is not specified`);
                    }

                    /**
                     * For each method that has been specified
                     */
                    for(let method in controller[directory].paths[path].methods){

                        /**
                         * Throw an error if no methods are defined
                         * ** At least GET method must be defined
                         */
                        if(!method){
                            throw Error('The method of the page is not specified');
                        }
                        /**
                         * Creates routes for all pages/directories/methods
                         * ** There is no need to create a route if this page is the default page (index page)
                         */

                        let route = `/${prefix}${directory_url}${(path === 'default' ? '' : '/'+paths_url)}`;

                        app[method](route, controller[directory].paths[path].methods[method]);
                    }
                }
            }

        }catch(e){
            console.log(e);
            throw Error(e.message);
        }
    }
}