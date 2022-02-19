const express = require('express');
const app = express();
const axios = require('axios').default;

// Get recent tweets from twitter
app.get('/get_recent_tweets', async (req, res) => {
  let twitter_query = req.body.query;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent' + '?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type',
    {
      params: {
        query: twitter_query,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

// Twitter fetch tweet's geolocation
app.get('/get_tweet_geolocation', async (req, res) => {
  let tweet_id = req.body.tweet_id;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/' + tweet_id + '?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

// Twitter search recent tweets
app.get('/search_recent_tweets', async (req, res) => {
  let twitter_query = req.body.query;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent' + '?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type',
    {
      params: {
        query: twitter_query,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
);
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
}
});

// Twitter return complete history of public tweets
app.get('/get_public_tweets', async (req, res) => {
  let twitter_query = req.body.query;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/all' + '?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type',
    {
      params: {
        query: twitter_query,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
);
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

// Twitter return a list of users who somebody follows
app.get('/get_followers', async (req, res) => {
  let user_id = req.body.query;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/users/' + user_id + '/following' + '?expansions=pinned_tweet_id&pinned_tweet.fields=id,text,created_at,user',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
);
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

// Twitter return tweets composed by a single user
app.get('/get_user_tweets', async (req, res) => {
  let user_id = req.body.query;
  let token = req.body.token;
  const response = await axios.get(
    'https://api.twitter.com/2/users/' + user_id + '/tweets' + '?expansions=pinned_tweet_id&pinned_tweet.fields=id,text,created_at,user',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
);
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

module.exports = app;
