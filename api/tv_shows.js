API_KEY =  ''

var Trakt = require('trakt-api');
var trakt = Trakt(API_KEY);

var country =  "us";

trakt.showTrending({countries: country, extended: 'full'}).then(function(show){
  console.log("list of trending tv shows in specified country: ");
  for(let i = 0; i<show.length;i++){
    console.log(show[i]['show']['title']);
  }
}).catch(function(err) {
  console.warn('error', err);
});
