# LIRI
  In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. 
However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and 
Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
The permissible functions for the LIRI CLI are the following :

<ul>
  <li> Spotify-this </li>
  <li> Concert-this </li>
  <li> Movie-this </li>
  <li> Do-what-it-says </li>
</ul>

# Functionality

## Spotify-this
  The spotify-this function takes in a string from the user and outputs songs (and their attributes) that contain that string in it's song title. <br>
  The search returns <strong> ALL </strong> artists that have the searched for string appearing in it's title. The attributes displayed of the search are :
 
 <ul>
  <li> Name of Artist </li>
  <li> Name of Track </li>
  <li> Link to Spotify </li>
  <li> Name of Album </li>
 </ul>
 
## Concert-this
  The concert-this function takes in a band name and searches for events where that band will be playing. It returns each event's following attributes : 
 <ul>
  <li> Venue </li>
  <li> Location </li>
  <li> Date </li>
 </ul>
 
## Movie-this
  The movie-this function takes in a string representing a movie name and searches for movies that match that title.  It returns each movie's following attributes :

  <ul>
  <li> Title of the Movie </li>
  <li> Year the movie came out </li>
  <li> IMDB Rating of the movie </li>
  <li> Rotten tomatoes rating </li>
  <li> Country where produced </li>
  <li> Language of movie </li>
 </ul>
 
## Do-what-it-says
 The "Do-what-it-says" function executes instruction that are written in the "Random.txt" file. 
 For example, if you were to have "movie-this,jaws" in the text file then the movie-this function would be executed with the string of "jaws".

# Technology Stack

<ul>
  <li> Axios </li>
    A library used to query APIs.
  <li> Moment JS </li>
    A library for formatting dates.
  <li> Node-spotify-api  </li>
    A library interface that helps the user query the spotify API.
  <li> Inquirer </li>
    A library for prompting the user for input.
</ul>
