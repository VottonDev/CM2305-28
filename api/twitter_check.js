const fs = require('fs');
const axios = require('axios').default;
require('dotenv').config();

// Get recent tweets from twitter

let counter = 0;

async function get_recent_tweets(jsonArr) {
  //let token = req.body.token;
  jsonArr = [];
  let token = process.env.TWITTER_TOKEN;
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent' +
      '?expansions=geo.place_id&tweet.fields=context_annotations,public_metrics,lang,author_id,source&place.fields=geo,country_code,contained_within&max_results=100',
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
    //console.log(response.data.includes.places[0].geo.bbox);
    //console.log(response.data.includes.places[0].country_code);
    for (i = 0; i < 100; i++) {
      if (response.data.data[i].geo != null && 'context_annotations' in response.data.data[i]) {
        const payload = {
          data: { text: ' ', author_id: ' ', coordinates: ' ', country_code: ' ', source: ' ', retweets: ' ', likes: ' ', interests: ' ' },
        };
        //console.log(response.data.data[i].text);
        counter += 1;
        payload.data.interests = response.data.data[i].context_annotations[0].domain.description;
        payload.data.text = response.data.data[i].text;
        payload.data.author_id = response.data.data[i].author_id;
        payload.data.coordinates = [
          (response.data.includes.places[counter - 1].geo.bbox[2] - response.data.includes.places[counter - 1].geo.bbox[0]) / 2,
          (response.data.includes.places[counter - 1].geo.bbox[3] - response.data.includes.places[counter - 1].geo.bbox[1]) / 2,
        ];
        payload.data.country_code = response.data.includes.places[counter - 1].country_code;
        payload.data.source = response.data.data[i].source;
        payload.data.retweets = response.data.data[i].public_metrics.retweet_count;
        payload.data.likes = response.data.data[i].public_metrics.like_count;

        const temp = payload;
        //console.log(temp);

        jsonArr.push(temp);

        //console.log(payload);
      }
    }
    //console.log(json);
  } else {
    //res.status(401).json(response.data);
  }
  let main_json = JSON.stringify(jsonArr);
  console.log(jsonArr);
  fs.writeFile('json.json', main_json, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  });
}

get_recent_tweets();
