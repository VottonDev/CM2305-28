//install npm install multilang-sentiment
const sentiment = require('multilang-sentiment');
const fs = require('fs');
const tv_show = require('./tv_shows.js');

//check if statement is positivie or negative and ouputs statement and its compund score
function analysis(text) {
  let score;
  const texts = sentiment(text);
  if (texts.score >= 0) {
    score = 'positive';
  } else if (texts.score < 0) {
    score = 'negative';
  }
  return score;
}

//read in json payload
const jsonData = require('./json.json');

const prev_data = fs.readFileSync('main_data.geojson');
const myObject = JSON.parse(prev_data);

// hold all objects to later convert to JSON file
let text_temp = ' ';
let author_temp = ' ';
geoArray = [];
global.tempshow = ' ';
global.geoJSON = {};

//carry out analysis on each posts in json payload
let geoJSON;
let country_code_temp;
for (let i = 0; i < jsonData.length; i++) {
  //created object for geoJSON variable
  geoJSON = {
    type: 'Feature',
    properties: { text: ' ', author_id: ' ', sentiment: ' ', tv_show: ' ', product: ' ', country_code:" ", source: " ", retweets:" ", likes:" ", interests:" "},
    geometry: { type: 'Point', coordinates: [] },
  };

  // add field values to geoJSON object
  text_temp = jsonData[i].data.text;
  author_temp = jsonData[i].data.author_id;
  country_code_temp = jsonData[i].data.country_code;
  coordinates = jsonData[i].data.coordinates;
  product_temp = jsonData[i].data.product;
  source_temp = jsonData[i].data.source;
  retweets_temp  = jsonData[i].data.retweets;
  likes_temp = jsonData[i].data.likes;
  interests_temp  =  jsonData[i].data.interests;


  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  geoJSON['properties']['sentiment'] = analysis(text_temp);
  geoJSON['geometry']['coordinates'] = coordinates;
  geoJSON['properties']['product'] = product_temp;
  geoJSON['properties']['country_code'] = country_code_temp;
  geoJSON['properties']['source'] = source_temp;
  geoJSON['properties']['retweets'] = retweets_temp;
  geoJSON['properties']['likes'] = likes_temp;
  geoJSON['properties']['interests']  = interests_temp;
  
    .then((show) => {
      geoJSON['properties']['tv_show'] = show;
      tempshow = show;
      //console.log(geoJSON);
    })
    .catch(() => {
      geoJSON['properties']['tv_show'] = ' ';
    });
}

setTimeout(function () {
  for (let i = 0; i < jsonData.length; i++) {
    geoJSON['properties']['tv_show'] = tempshow;
    const temp = geoJSON;
    console.log(temp);
    //geoArray.push(temp);
    myObject.push(temp);
  }
  const geoConvert = JSON.stringify(myObject);
  fs.writeFile('main_data.geojson', geoConvert, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file for geoJSON file has been saved.');
  });
  
const geoWrap={
  type:'FeatureCollection',
  features: myObject
}

const main_geo = JSON.stringify(geoWrap);

  fs.writeFile("pulled_data_load.geojson", main_geo, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("geoJSON file has been saved.");
  });
}, 2000);
