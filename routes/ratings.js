// Strict JavaScript mode is used
"use strict";

// Database configuration is obtained
const config = require("../configurations/database");

// The driver of MongoDB is used
const MongoClient = require('mongodb').MongoClient;

module.exports = router => {

    // Create a new rating
    router.post("/ratings", (req, res) => {
        let body = req.body;
        let rating = body.rating;
        let username = body.username;

        if (username && rating) {

            MongoClient.connect(config.uri, {
                useNewUrlParser: true
            }, (err, client) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Error ' + err
                    });
                } else {
                    let db = client.db(config.db);

                    let ratingsC = db.collection('ratings');

                    let newRating = {
                        username: username,
                        rating: rating
                    };

                    ratingsC.insertOne(newRating, (error, response) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'Error ' + error
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'The rating was created'
                            });
                        }
                    });
                }

                client.close();
            });
        }
    });

    // Get all ratings
    router.get("/ratings", (req, res) => {
        MongoClient.connect(config.uri, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error ' + err
                })
            } else {
                let db = client.db(config.db);

                let ratingsC = db.collection('ratings');

                ratingsC.find().toArray((err, rats) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Error ' + err
                        });
                    } else if (rats.length === 0) {
                        res.json({
                            success: false,
                            message: 'There are no ratings'
                        });
                    } else {
                        res.json({
                            success: true,
                            ratings: rats
                        });
                    }

                    client.close();
                });
            }
        });
    });

    return router;
};