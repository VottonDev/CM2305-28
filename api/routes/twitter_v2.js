import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  TWITTER_TOKEN: process.env.TWITTER_TOKEN,
});

const roClient = twitterClient.readOnly;

// Get all recent tweets based on a search term and return the geo location of the tweet
export const getTweets = async (req, res) => {
  const { searchTerm } = req.query;
  const tweets = await roClient.get('search/tweets', { q: searchTerm });
  const geoTweets = tweets.statuses.filter((tweet) => tweet.geo);
  const geoTweetsWithCoordinates = geoTweets.map((tweet) => {
    const { coordinates } = tweet.geo;
    return {
      ...tweet,
      coordinates,
    };
  });
  res.send(geoTweetsWithCoordinates);
};
