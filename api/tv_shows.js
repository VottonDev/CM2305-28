const Trakt = require('trakt-api');
const trakt = Trakt(process.env.TRAKT_API_KEY);

const country = 'us';

trakt
  .showTrending({ countries: country, extended: 'full' })
  .then(function (show) {
    console.log('list of trending tv shows in specified country: ');
    for (let i = 0; i < show.length; i++) {
      console.log(show[i]['show']['title']);
    }
  })
  .catch(function (err) {
    console.warn('error', err);
  });
