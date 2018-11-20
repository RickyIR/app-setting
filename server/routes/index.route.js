/**
 * Deps
 */
const chalk = require('chalk');
const express = require('express');
const path = require('path');

const router = require('./_router');
const controllers = require('./../controllers/index.controller.js');


module.exports = {
    init: (app) => {
        try{
            /**
             * Initialization all routes for the website
             */
            router.init(app, 'api', controllers.ApiController);

            // Angular files

            app.use('/', express.static(path.resolve(__dirname, './../../client')));
            
            app.get('/', (req, res, next) => {
                return res.sendFile(express.static(path.resolve(__dirname, './../../client')));
            })

            // Static files
            app.use('/public', express.static(path.resolve(__dirname, './../../public')));

            module.exports.getAllRoutes(app);

        }catch(e){
            console.log(chalk.red(` Error occurred while creating routing of the website, \n Error message: ${e.message}`));
        }
    },
    getAllRoutes: (app) => {
        /**
         * console.log all routes
        */
        console.log('\n All Routes:\n');
        app._router.stack.forEach(function(r){
            if (r.route && r.route.path && r.route.methods){
                for(let method in r.route.methods){
                    console.log(chalk.yellow(` https://hadley.edu${r.route.path} | `) + chalk.cyan(`${method.toString().toUpperCase()}`));
                }
            }
            });
    }
}