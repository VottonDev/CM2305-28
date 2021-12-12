const express = require('express');
const app = express();
const axios = require('axios').default;

// Get recent tweets from twitter
app.get('/get_recent_tweets', async (req, res) => {
  let twitter_query = req.body.query;
  let token = req.body.token;
  const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
    params: {
      query: twitter_query,
    },
    headers: {
      Authorization: 'Bearer '+ token,
    },
  });
  if (response.status === 200) {
    res.status(200).json(response.data);
  }
  else {
    res.status(401).json(response.data);
  }
});

module.exports = app;