# Movie Verdicts
Movie Verdicts is web applicaton developed using AngularJS and NodeJS framework.

# Features!
  - Sort By Name, Release Date and Rating.
  - Clicking on star changes the rating of a movie.
  - Movies not yet rated will show "Not Rated"
  - Movies not yet released, star ratings are read only.
  - Dynamic updation of bar chart with updated ratings.
  - Updated ratings is stored in movies.json

### Tech
Movie Verdicts uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - mini node.js network app framework

### Installation
Movie Verdicts requires [Node.js](https://nodejs.org/) to run.

### Development 
Open Terminal, navigate to the project folder and run these commands.

```sh
$ npm install
$ npm install express --save
$ npm install angularjs --save
$ npm install zingchart-angularjs --save
$ npm install mocha --save
$ npm install request --save
```


### Steps to start application locally
To Download or clone the project, open terminal

```sh
$ git clone https://github.com/mvenkatapraveen/movieverdicts
```

Navigate to the movieverdicts folder and run the following command

```sh
$ npm install
$ npm start
```
Launch http://localhost:8080/ in a web browser

### Unit Test
Open Terminal, navigate to the project folder and run the following command
```sh
$npm install mocha
$./node_modules/mocha/bin/mocha
```
