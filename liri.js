var keys = require("./keys")
var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
require('requester')



// console.log(keys.spotify.id)

var query = process.argv
query = query.slice(2)

switch(query[0])
{
  case 'my-tweets':
  callTwitter()
  break;

  case 'spotify-this-song':
  var song = query.slice(1).join(" ")
  callSpotify(song)
  break;

}

function callSpotify(song)
{
  var spotify = new Spotify({id: keys.spotify.id, secret: keys.spotify.secret})
  spotify.search({type: 'track', query: song,}, function(err, data){
    if(err){
      console.log(err)
    }
    var data = data.tracks.items[0]
    var artist = data.album.artists
    var album = data.album.name
    var song = data.name
    var url = data.external_urls.spotify
    var artistNames = []
    artist.forEach(element => {
    artistNames.push(element.name)
  });
      
    console.log("Artist(s): " + artistNames.join(", "))
    console.log(`Song Name: ${song}`)
    console.log(`Album: ${album}`)
    console.log(`URL: ${url}`)
  })
}

function callTwitter()
{
  var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });

  client.get('statuses/user_timeline', { screen_name: 'manuel17', count: 20 },function(error, tweets) {
    if(error) throw error;
    // console.log(tweets[0].text);  // The favorites.
    // console.log(response);  // Raw response object.
    tweets.forEach(function(element){
      console.log("------------------------------")
      console.log(element.text)
      console.log(element.created_at)
    })
  });
}