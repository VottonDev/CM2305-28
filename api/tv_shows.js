const Trakt = require('trakt.tv');
const Promise = require('promise');
require('dotenv').config();

let options = {
  client_id: process.env.TRAKT_CLIENT_ID,
  client_secret: process.env.TRAKT_CLIENT_SECRET,
};

function getTrendingTvShow(country) {
  return new Promise((resolve, reject) => {
    let trakt = new Trakt(options);
    trakt.shows
      .trending(country)
      .then((shows) => {
        let randomIndex = Math.floor(Math.random() * shows.length);
        let randomShow = shows[randomIndex].show.title;
        resolve(randomShow);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = getTrendingTvShow;
