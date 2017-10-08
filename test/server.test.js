var assert = require('assert');
var fs = require('fs');
var http = require('http');
var request = require('request');

var server, postData;

describe('MovieVerdict', function() {
    var fileData;
    before(function(done) {
        //Read movies.json file
        fs.readFile('data/movies.json', 'utf8', function(err, data) {
            if (err) throw err;
            fileData = data;
            done();
        });

        //post data to movies api
        postData = [
            { "$id": "1", "title": "Gone Girl", "image": "images/movie1.jpg", "rating": "3", "releaseDate": "2014-02-22" },
            { "$id": "2", "title": "The Good Life", "image": "images/movie2.jpg", "rating": "4", "releaseDate": "2014-06-24" },
            { "$id": "3", "title": "The Hero of Color City", "image": "images/movie3.jpg", "rating": "0", "releaseDate": "2014-11-23" },
            { "$id": "4", "title": "Guardians of the Galaxy", "image": "images/movie4.jpg", "rating": "5", "releaseDate": "2014-07-01" },
            { "$id": "5", "title": "The Drop", "image": "images/movie5.jpg", "rating": "0", "releaseDate": "2014-12-01" },
            { "$id": "6", "title": "If I Stay", "image": "images/movie6.jpg", "rating": "0", "releaseDate": "2019-01-01" }
        ];

        //Start the server
        server = require('../server.js')

    });

    describe('movies.json', function() {
        it('should exists', function() {
            assert.equal(fs.statSync("data/movies.json").isFile(), true);
        });
        it('should not be empty', function() {
            assert.equal(fileData.length > 0, true);
        });
        it('should have 6 movie objects', function() {
            var movies = JSON.parse(fileData)
            assert.equal(movies.length, 6);
        });
        it('should contain $id, title, image, rating, releaseDate in all 6 movie objects', function() {
            var movies = JSON.parse(fileData)
            for (var index in movies) {
                assert.equal(movies[index]['$id'] != undefined, true);
                assert.equal(movies[index]['title'] != undefined, true);
                assert.equal(movies[index]['image'] != undefined, true);
                assert.equal(movies[index]['rating'] != undefined, true);
                assert.equal(movies[index]['releaseDate'] != undefined, true);
            }
        });
    });

    describe('GET /movies', function() {
        it('should return 200', function(done) {
            http.get('http://localhost:8080/movies', function(res) {
                assert.equal(200, res.statusCode);
                done();
            });
        });

    });

    describe('POST /movies', function() {

        it('should return 200', function(done) {
            var options = {
                url: 'http://localhost:8080/movies',
                method: 'POST',
                body: postData,
                json: true
            };
            request.post(options, function(error, response, body) {
                assert.equal(200, response.statusCode);
                done();
                //Exit the server
                process.exit(1);
            })
        });

    });

})