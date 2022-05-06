const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi');
const axios = require('axios').default;

// Get recent tweets from twitter

let counter = 0;

async function get_recent_tweets(jsonArr) {
  //let token = req.body.token;
  jsonArr = [];
  let token = 'AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi';
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent' + '?expansions=geo.place_id&tweet.fields=lang,author_id&place.fields=geo,country_code,contained_within&max_results=100',
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
      if (response.data.data[i].geo != null) {
        const payload = {
          data: { text: ' ', author_id: ' ', coordinates: ' ', country_code: ' ' },
        };
        //console.log(response.data.data[i].text);
        payload.data.text = response.data.data[i].text;
        //console.log(response.data.data[i].author_id);
        payload.data.author_id = response.data.data[i].author_id;
        counter += 1;
        //console.log(response.data.includes.places[counter-1].geo.bbox);
        payload.data.coordinates = response.data.includes.places[counter - 1].geo.bbox;
        //console.log(response.data.includes.places[counter-1].country_code);
        payload.data.country_code = response.data.includes.places[counter - 1].country_code;

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
