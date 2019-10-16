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

  // Create a "Prompt" with a series of questions.
  function startPrompt(){
    inquirer.prompt([
      // Here are the possible LIRI options.
      {
        type: "list",
        message: "Which Pokemon do you choose?",
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
                
    // Optionally the request above could also be done as
    axios.get(userQuery).then(function (response) {

    console.log(response);
                
    if(response.data.Response !== 'False'){
      console.log("Title of the movie is : " + response.data.Title);
      console.log("Year the movie came out : " + response.data.Year);
      console.log("IMDB Rating of the movie : " + response.data.Rating);
      console.log("Rotten Tomatoes Rating of the movie : " + response.data.Metascore);
      console.log("Country where the movie was produced : " + response.data.Country);
      console.log("Language of the movie : " + response.data.Language);
      console.log("Plot of the movie : " + response.data.Plot);
      console.log("Actors in the movie : " + response.data.Actors);}
    }).catch(function (error) {
      console.log(error);
      })
      .then(function () {
      // always executed
      });             
  }

  function workMusic(songTitle){
    var response = songTitle;
    var userQuery = response.song.replace(/\s/g,'+').toLowerCase();
    console.log(userQuery);
      
    spotify.search({type: 'track', query: userQuery}, function(err, data) {

      if (err) {
            return console.log('Error occurred: ' + err);
          }
          for (var i = 0; i < data.tracks.items.length; i++){
            for (var j = 0; j < data.tracks.items[i].album.length; i++){
              console.log("Artist[s]: " + data.tracks.items[i].album.artists[j]);
            }
            
            console.log("Link to Spotify preview: " + data.tracks.items[i].album.href);
            console.log("");
            console.log("-----------------------------------------------------");
          }
        });
  };

  function workEvent(bandName){

    var response = bandName;
    var artistQuery = response.replace(/\s/g,'+').toLowerCase();
    var userQuery = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";
  
      axios.get(userQuery)
      .then(function(response) {
        if (response.data !== '[]') {
          for (var i = 0; i < response.data.length; i++){
            console.log("Venue: " + response.data[i].venue.name); 
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log("Date: " + date);        
            console.log("-----------------------------------------------------");
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
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data"
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
      if (error) 
        return console.log(error);

      // We will then print the contents of data
      console.log(data);
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
    
      // We will then re-display the content as an array for later use.
      console.log(dataArr[0]);
      console.log(dataArr[1]);

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