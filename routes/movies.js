// Strict JavaScript mode is used
"use strict";

// Database configuration is obtained
const config = require("../configurations/database");

// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const MongoClient = require('mongodb').MongoClient;

module.exports = router => {

  // Get all movies. Limit 20 with pagination
  router.get("/movies/:page", (req, res) => {
    let skip = req.params.page * 30;
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

        let moviesC = db.collection('movies');

        moviesC.find().sort({
          movieTitle: 1
        }).skip(skip).limit(30).toArray((err, movs) => {
          if (err) {
            res.json({
              success: false,
              message: 'Error ' + err
            });
          } else if (movs.length === 0) {
            res.json({
              success: false,
              message: 'There are no movies'
            });
          } else {
            res.json({
              success: true,
              movies: movs
            });
          }

          client.close();
        });
      }
    });
  });

  // Get movie by title
  router.get("/movie/title/:title", (req, res) => {
    let title = req.params.title.replace(/_/g, " ");

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

      let moviesC = db.collection('movies');

      moviesC.findOne({
        title: title
      }).then((mov) => {
        if (!mov) {
          res.json({
            success: false,
            message: 'There is no movie with title ' + title
          });
        } else {
          res.json({
            success: true,
            movie: mov
          })
        }

        client.close();
      });
    });
  });

  // Create a new movie
  router.post("/movies", (req, res) => {
    let body = req.body;
    let title = body.title;
    let genre = body.genre;
    let year = body.releaseYear;
    let director = body.director;
    let country = body.country;
    let rating = body.rating;
    let poster = body.poster;

    if (!title) {
      res.json({
        success: false,
        message: 'The movie must have a title'
      });
    } else if (!genre) {
      res.json({
        success: false,
        message: 'The movie must have a genre'
      });
    } else if (!year) {
      res.json({
        success: false,
        message: 'The movie must have a year'
      });
    } else if (!director) {
      res.json({
        success: false,
        message: 'The movie must have a director'
      });
    } else if (!country) {
      res.json({
        success: false,
        message: 'The movie must have a country'
      });
    } else if (!rating) {
      res.json({
        success: false,
        message: 'The movie must have a rating'
      });
    } else if (!poster) {
      res.json({
        success: false,
        message: 'The movie must have a poster'
      });
    } else {

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

          let moviesC = db.collection('movies');

          let newMovie = {
            title: title,
            genre: genre,
            releaseYear: year,
            director: director,
            country: country,
            rating: rating,
            poster: poster
          };

          moviesC.insertOne(newMovie, (error, response) => {
            if (err) {
              res.json({
                success: false,
                message: 'Error ' + error
              });
            } else {
              res.json({
                success: true,
                message: 'The movie was created'
              });
            }
          });
        }

        client.close();
      });
    }
  });

  // Delete a movie by title
  router.delete('/movies/:title', (req, res) => {

    let title = req.params.title.replace(/_/g, " ");

    if (!title) {
      res.json({
        success: false,
        message: 'The title of the movie to delete must be inserted'
      });
    } else {

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

          let moviesC = db.collection('movies');
          moviesC.deleteOne({
            movieTitle: title
          }, (error, response) => {
            if (err) {
              res.json({
                success: false,
                message: 'Error ' + error
              });
            } else if (response.deletedCount === 0) {
              res.json({
                success: false,
                message: 'There was no movie with that title for deleting it'
              });
            } else {
              res.json({
                success: true,
                message: 'The movie was deleted'
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