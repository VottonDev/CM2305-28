const {TwitterApi} = require('twitter-api-v2');
const fs = require('fs');

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi');
const roClient = client.readOnly;

const express = require('express');
const app = express();
const axios = require('axios').default;
var randomCoordinates = require('random-coordinates');
var prev_data = fs.readFileSync('json.json');
var myObject = JSON.parse(prev_data);
var wc = require('which-country');


console.log(myObject.length);

// Get recent tweets from twitter

var counter = 0


async function get_recent_tweets(jsonArr){

  function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

  //let token = req.body.token;
  query  = 'Fanta';
  jsonArr = [];
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    "https://api.twitter.com/2/tweets/search/recent" + "?expansions=geo.place_id&tweet.fields=public_metrics,lang,author_id,source&place.fields=geo,country_code,contained_within&max_results=100",
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    //res.status(200).json(response.data);
    //console.log(response.data.includes.places[0].geo.bbox);
    //console.log(response.data.includes.places[0].country_code);
    for (i=0; i<100; i++){
          const payload = {
            data:{product: query, text: " ", author_id: " ", coordinates:" ", country_code: " ", source:" ", retweets:" ", likes:" "}
          };
          var lat = getRandomFloat(-90.00,90.00,2);
          var long = getRandomFloat(-180.00,180.00,2);
          if (wc([long,lat])!= null){
            payload.data.text = response.data.data[i].text;
            payload.data.author_id = response.data.data[i].author_id;
            payload.data.country_code = wc([long,lat]);
            payload.data.coordinates = [long,lat];
            payload.data.source = response.data.data[i].source;
            payload.data.retweets = response.data.data[i].public_metrics.retweet_count;
            payload.data.likes = response.data.data[i].public_metrics.like_count;
            counter += 1;
            var temp = payload;
            //console.log(temp);
            myObject.push(temp);
            console.log(temp);
          }
    }
    //console.log(json);
  } else {
    //res.status(401).json(response.data);
  }
  main_json = JSON.stringify(myObject);
  fs.writeFile("json.json", main_json, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }

      console.log("JSON file has been saved.");
  });
};


async function get_user_details(){
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    "https://api.twitter.com/2/users/2244994945/liked_tweets?max_results=5&expansions=referenced_tweets.id,attachments.media_keys&tweet.fields=public_metrics,source&media.fields=type,duration_ms",
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  if (response.status === 200) {
    console.log(response.data.includes);
    }
    //console.log(json);
   else {
    //res.status(401).json(response.data);
  }
};


get_recent_tweets();
//get_user_details();
