// Strict JavaScript mode is used
"use strict";

// File that allow to configure aspects of the application
const env = require('./env');

// Fast, unopinionated, minimalist web framework for node.
const express = require("express");

// Express initialization
const app = express();

// Object for the routes
const router = express.Router();

// Node.js body parsing middleware.
const bodyParser = require("body-parser");

// Used for allowing paths
const path = require('path');

// Port to use
const port = process.env.PORT || 8080;

// API route
const apiRoute = "/mernMovies/";

// API routes of movies
//const movies = require('./routes/movies')(router);
const movies = require('./routes/movies')(router);

// JSON body request is configured
app.use(
    bodyParser.json({
        limit: "1mb"
    })
);

// Url encoded body request is configured
app.use(
    bodyParser.urlencoded({
        limit: "1mb",
        extended: true
    })
);

// Route of static files is defined
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Movies routes are used
app.use(apiRoute, movies);

// Connection to front
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// Port is defined and app is connected
app.listen(port, () => {
    console.log(
        "The application server is running on the port " +
        port + " in " + process.env.NODE_ENV + " mode"
    );
});