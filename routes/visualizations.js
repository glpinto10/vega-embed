// Strict JavaScript mode is used
"use strict";

// Database configuration is obtained
const config = require("../configurations/database");

// The driver of MongoDB is used
const MongoClient = require('mongodb').MongoClient;

module.exports = router => {

    // Get the last 20 visualizations
    router.get("/visualizations", (req, res) => {
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

                let visualizationsC = db.collection('visualizations');

                visualizationsC.find().project({
                    username: 1,
                    title: 1,
                    date: 1
                }).limit(20).sort({
                    date: -1
                }).toArray((err, visus) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Error ' + err
                        });
                    } else if (visus.length === 0) {
                        res.json({
                            success: false,
                            message: 'There are no saved visualizations'
                        });
                    } else {
                        res.json({
                            success: true,
                            visualizations: visus
                        });
                    }

                    client.close();
                });
            }
        });
    });

    // Get visualization by title, author and timestamp
    router.get("/visualization/title/:title/username/:username/date/:date", (req, res) => {
        let params = req.params;

        let title = params.title.replace(/_/g, " ");
        let username = params.username.replace(/_/g, " ");
        let date = params.date;

        MongoClient.connect(config.uri, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error ' + err
                });
            };

            let db = client.db(config.db);

            let visualizationsC = db.collection('visualizations');

            visualizationsC.findOne({
                title: title,
                username: username,
                date: date
            }).then((visu) => {
                if (!visu) {
                    res.json({
                        success: false,
                        message: 'There is no visualization with title ' + title + ' from author ' + username
                    });
                } else {
                    res.json({
                        success: true,
                        visualization: visu
                    });
                }

                client.close();
            });
        });
    });

    // Create a new visualization
    router.post("/visualizations", (req, res) => {
        let body = req.body;
        let spec = body.spec;
        let title = body.title;
        let username = body.username;
        let date = new Date().getTime();
        let data = body.data;

        if (username && title && spec && data && date) {

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

                    let visualizationsC = db.collection('visualizations');

                    let newVisualization = {
                        username: username,
                        spec: spec,
                        title: title,
                        date: date,
                        data: data
                    };

                    visualizationsC.insertOne(newVisualization, (error, response) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'Error ' + error
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'The visualization was stored.'
                            });
                        }
                    });
                }

                client.close();
            });
        }
    });


    return router;
};