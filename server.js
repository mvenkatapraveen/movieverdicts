const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Welcome to Service Now..!!');
});

//get data from movies.json
app.get('/movies', function(req, res) {
    fs.readFile('data/movies.json', function read(err, data) {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
});

//post data to movies.json
app.post('/movies', function(req, res) {
    fs.writeFile('data/movies.json', JSON.stringify(req.body), function write(err, data) {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
});

app.listen(8080, function() {
    console.log('Service now app listening on port 8080!');
});