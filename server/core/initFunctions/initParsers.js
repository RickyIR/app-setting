const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

/**
 * The function that performs initialization of the body parser
 * Parser type:  JSON
 * @param app - express application 
 */
const initParsers = (app) => {
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = initParsers;