module.controller('homeCtrl', function($scope, $http, $filter) {
    //Used for fetching data from server
    $http({
        method: 'GET',
        url: 'movies'
    }).then(function successCallback(response) {
        $scope.movies = response.data;
        $scope.updateChart();
    }, function errorCallback(response) {
        console.log(response);
    });
    
    //Current Date
    $scope.date = new Date();
    
    //Returns true or false based on release date
    $scope.isDisabled = function(releaseDate) {
        $scope.newDate = new Date(releaseDate);
        return $scope.newDate < $scope.date;
    };
    
    //get Stars Based on Rating
    $scope.getFilledStars = function(rating) {
        return new Array(parseInt(rating));
    };

    $scope.getUnFilledStars = function(rating) {
        return new Array(5 - parseInt(rating));
    };
    
    // Update Ratings based on click of star icons
    $scope.updateStar = function(movieIndex, newRating) {
        $scope.movies[movieIndex].rating = (newRating + 1).toString();
        $scope.save();
        $scope.updateChart();
    };
    
    $scope.updateUnStar = function(movieIndex, oldRating, newRating) {
        $scope.movies[movieIndex].rating = (parseInt(oldRating) + newRating + 1).toString();
        $scope.save();
        $scope.updateChart();
    };
    
    //Used for sending information to server
    $scope.save = function() {
        $http({
            method: 'POST',
            url: 'movies',
            data: $scope.movies
        }).then(function successCallback(response) {
            console.log(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

    };
    
    //Sort Movies based on key value
    $scope.sortMovies = function(key) {
        $scope.movies = $filter('orderBy')($scope.movies, key, true);
    }
    
    
    //Chart Component
    $scope.chartObj = {
        type: "bar",
        title: {
            backgroundColor: "transparent",
            fontColor: "black",
            text: "Movie Stats" //Adds title to chart
        },
        backgroundColor: "white",
        "scale-x":{
            label:{
                "text":"Rating",// Adds label on x-axis
                "font-size":14
            }
        },
        "scale-y":{
            label:{
                "text":"No. of Movies",//Adds label on y-axis
                "font-size":14  
            }
        },
        tooltip:{
     	  text:'No. of Movies: %v <br> Rating: %kl'//Displays tooltip with no. of movies and rating
     	},
        series: [{
            values: [],
            backgroundColor: "#5bbbf7"
        }]
    };
    
    
    //update Chart values dynamically
    $scope.updateChart = function() {
        $scope.chartObj.series[0].values = [0, 0, 0, 0, 0, 0];//All values initilised to 0 
        for (var index in $scope.movies) {
            var temp = $scope.movies[index].rating;
            //Based on rating, the value is incremented by 1 (to display no. of movies)
            $scope.chartObj.series[0].values[parseInt(temp)] = $scope.chartObj.series[0].values[parseInt(temp)] + 1;
        }
    };
    
   
    
}); 