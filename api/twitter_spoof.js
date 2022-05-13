const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi');
const roClient = client.readOnly;

const express = require('express');
const app = express();
const axios = require('axios').default;
const randomCoordinates = require('random-coordinates');
const prev_data = fs.readFileSync('json.json');
const myObject = JSON.parse(prev_data);
const wc = require('which-country');

console.log(myObject.length);

// Get recent tweets from twitter

let counter = 0;

async function get_recent_tweets(jsonArr) {
  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  }

  //let token = req.body.token;
  query = 'Fanta';
  jsonArr = [];
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent' + '?expansions=geo.place_id&tweet.fields=lang,author_id&place.fields=geo,country_code,contained_within&max_results=100',
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
    for (i = 0; i < 100; i++) {
      const payload = {
        data: { product: query, text: ' ', author_id: ' ', coordinates: ' ', country_code: ' ' },
      };
      const lat = getRandomFloat(-90.0, 90.0, 2);
      const long = getRandomFloat(-180.0, 180.0, 2);
      if (wc([long, lat]) != null) {
        payload.data.text = response.data.data[i].text;
        payload.data.author_id = response.data.data[i].author_id;
        payload.data.country_code = 'us';
        payload.data.coordinates = [long, lat];
        counter += 1;
        const temp = payload;
        console.log(wc([long, lat]));
        console.log(long, lat);
        //console.log(temp);
        myObject.push(temp);
      }
    }
    //console.log(json);
  } else {
    //res.status(401).json(response.data);
  }
  main_json = JSON.stringify(myObject);
  fs.writeFile('json.json', main_json, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  });
}

get_recent_tweets();
