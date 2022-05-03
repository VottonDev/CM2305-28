const {TwitterApi} = require('twitter-api-v2');


const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi');
const roClient = client.readOnly;

const express = require('express');
const app = express();
const axios = require('axios').default;

// Get recent tweets from twitter
app.get('/get_recent_tweets', async (req, res) => {
  let twitter_query = req.body.query;
  //let token = req.body.token;
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
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
    console.log(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

// Twitter fetch tweet's geolocation
app.get('/get_tweet_geolocation', async (req, res) => {
  let tweet_id = req.body.query;
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



async function get_recent_tweets(){
  //let token = req.body.token;
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    "https://api.twitter.com/2/tweets/search/recent" + "?expansions=geo.place_id&tweet.fields=lang,author_id&place.fields=geo,country_code,contained_within&max_results=100",
    {
      params: {
        query: 'Holiday',
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    //res.status(200).json(response.data);
    console.log((response.data.includes.places[0]));
    for (i=0; i<100; i++){
        if (response.data.data[i].geo != null){
          console.log(response.data.data[i])
        }
    }
    //console.log(json);
  } else {
    //res.status(401).json(response.data);
  }
};

async function get_geo_tweets(){
  let place_id  =  '1521178513553899520'
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/' + tweet_id + '?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type',
    {

      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    //res.status(200).json(response.data);
    console.log(response.data);
  } else {
    //res.status(401).json(response.data);
  }


};

get_recent_tweets();
