  // Where to place the API keys
  require("dotenv").config();

  // Adding the keys import class
  var keys = require("./keys.js");

  // Package requirements
  var axios = require('axios');
  var inquirer = require('inquirer');
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotifyKeys);
  var moment = require("moment");

  // fs is a core Node package for reading and writing files
  var fs = require("fs");

  function writeFile(data){
    fs.writeFile("randomOutput.txt", data, function(err) {

      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
    
      // Otherwise, it will print: "movies.txt was updated!"
      console.log("randomOutput.txt was updated!");
    });    
  }

  // Create a "Prompt" with a series of questions.
  function startPrompt(){
    inquirer.prompt([
      // Here are the possible LIRI options.
      {
        type: "list",
        message: "Which action do you choose?",
        choices: ["concert-this", "spotify-this-song", "movie-this","do-what-it-says"],
        name: "choice"
      }
    ]).then(function(inquirerResponse) {
      
      // Depending on the user selection call a specific function
      switch(inquirerResponse.choice)
      {
          case 'movie-this':
              movieSearch("inquirerInput");
              break;
          case 'concert-this':
              eventSearch("inquirerInput");
              break;
          case 'spotify-this-song':
              musicSearch("inquirerInput");
              break;
          case 'do-what-it-says':
              doThis();
              break;
      }

    });

  }

  function workMovie(movie){
    var queryMovie = movie;
    var userQuery = "http://www.omdbapi.com/?apikey=trilogy&t=" + queryMovie;
                
    // Optionally the request above could also be done
    axios.get(userQuery).then(function (response) {

    // If the response is not False then it means a movie has been found. Else, no has been found.                
    if(response.data.Response !== 'False'){
      console.log("Title of the movie is : " + response.data.Title);
      console.log("Year the movie came out : " + response.data.Year);
      console.log("IMDB Rating of the movie : " + response.data.Rating);
      console.log("Rotten Tomatoes Rating of the movie : " + response.data.Metascore);
      console.log("Country where the movie was produced : " + response.data.Country);
      console.log("Language of the movie : " + response.data.Language);
      console.log("Plot of the movie : " + response.data.Plot);
      console.log("Actors in the movie : " + response.data.Actors);}
    else{
      console.log("Movie has not been found !");
    }
    }).catch(function (error) {
      console.log(error);
      })
      .then(function () {
      // always executed
      });             
  }

  function workMusic(songTitle){
    var response = songTitle;
    var userQuery = response.replace(/\s/g,'+').toLowerCase();      
    if(songTitle !== ""){
      spotify.search({type: 'track', query: userQuery}, function(err, data) {
        if (err)
          return console.log('Error occurred: ' + err);
        else if(data.tracks.items == 0)
          console.log("No song found with that name !");
        else{  
          for (var i in data.tracks.items){
            console.log("Name of Artist : " + data.tracks.items[i].album.artists[0].name);
            console.log("Name of Track : " + data.tracks.items[i].name);              
            console.log("Link to Spotify preview: " + data.tracks.items[i].album.href);
            console.log("Name of Album : " + data.tracks.items[i].album.name);              
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
          }
        }
      });
    } else {
      console.log("Please a string that is not empty !");
    }



  };

  // @author: Emma Stotz :: The workEvent function was taken from this repository = https://github.com/emmastotz/gari-node-app
  // The method takes in a band name and queries the bands in town API to look for all valid events.
  // If the band has no valid events in town then it will console log that no concerts where found.
  // @fixed: Changed the if-conditional to response.data.length !== 0 in order to make the else statement operate correctly
  function workEvent(bandName){
    var response = bandName;
    var artistQuery = response.replace(/\s/g,'+').toLowerCase();
    var userQuery = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";
  
    axios.get(userQuery)
      .then(function(response) {
        if (response.data.length !== 0) {
          for (var i = 0; i < response.data.length; i++){
            console.log("Venue: " + response.data[i].venue.name); 
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log("Date: " + date);        
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
          }
        }
        else {
          console.log('No concerts found. Try again.');
        }
      });  
  };
  
  function movieSearch(p){
    if(p == "inquirerInput"){
      inquirer.prompt([
        {
          type: "text",
          message: "Which movie would you like to search for ?",
          name: "movie"
        }]).then(function(inquirerResponse) {
          workMovie(inquirerResponse.movie);
        });
    }
    else{
      workMovie(p);
    }     
  };

  function eventSearch(p){
    if(p == "inquirerInput"){
      inquirer.prompt([
        // Here are the possible LIRI options.
        {
          type: "text",
          message: "Which band would you like to see ?",
          name: "band"
        }
      ]).then(function(inquirerResponse) {
        workEvent(inquirerResponse.band);
      });
    } else{
      workEvent(p);
    }
  };

  function musicSearch(p) {
    if(p == 'inquirerInput'){
      inquirer.prompt([
        {
          type: "input",
          name: "song",
          message: "What song would you like to spotify?"
        }])
          .then(function(inquirerResponse){
            workMusic(inquirerResponse.song);
        })
    } else {
      workMusic(p);
    }
  };

  function doThis(){
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage).
    // The code will store the contents of the reading inside the variable "data".
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
      if (error) 
        return console.log(error);
        
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      switch(dataArr[0])
      {
        case 'movie-this':
          movieSearch(dataArr[1]);
          break;
        case 'concert-this':
          eventSearch(dataArr[1]);
          break;
        case 'spotify-this-song':
          musicSearch(dataArr[1]);
          break;
      }
    });       
  };  

  // Starts the LIRI bot sequence
  startPrompt();