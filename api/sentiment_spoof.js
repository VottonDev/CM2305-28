const sentiment = require('multilang-sentiment');
const fs = require('fs');
const geoFilter = require('geojson-filter');

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

//const prev_data = fs.readFileSync('pulled_data_load.geojson');
//const myObject = JSON.parse(prev_data);
var myObject = JSON.parse('[]');

// hold all objects to later convert to JSON file
let text_temp = ' ';
let author_temp = ' ';
geoArray = [];
tv_array = ['Better Call Saul', 'Ozark', 'FBI', 'Moon Knight', 'Halo', 'This Is Us', 'Star Trek: Picard', 'MasterChef Australia', 'New Amsterdam', 'The Resident'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//carry out analysis on each posts in json payload
for (i = 0; i < jsonData.length; i++) {
  //created object for geoJSON variable
  geoJSON = {
    type: 'Feature',
    properties: { text: ' ', author_id: ' ', sentiment: ' ', tv_show: ' ', product: ' ', country_code: ' ', source: ' ', retweets: ' ', likes: ' ', interests: ' ' },
    geometry: { type: 'Point', coordinates: [] },
  };

  // add field values to geoJSON object
  text_temp = jsonData[i].data.text;
  author_temp = jsonData[i].data.author_id;
  country_code_temp = jsonData[i].data.country_code;
  coordinates = jsonData[i].data.coordinates;
  product_temp = jsonData[i].data.product;
  source_temp = jsonData[i].data.source;
  retweets_temp = jsonData[i].data.retweets;
  likes_temp = jsonData[i].data.likes;
  interests_temp = jsonData[i].data.interests;

  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  //Add sentiment field to the json object
  //jsonData['data'][i]['sentiment'] = analysis(jsonData['data'][i]["text"]);
  geoJSON['properties']['sentiment'] = analysis(text_temp);
  geoJSON['geometry']['coordinates'] = coordinates;
  geoJSON['properties']['product'] = product_temp;
  geoJSON['properties']['country_code'] = country_code_temp;
  geoJSON['properties']['source'] = source_temp;
  geoJSON['properties']['retweets'] = retweets_temp;
  geoJSON['properties']['likes'] = likes_temp;
  geoJSON['properties']['interests'] = interests_temp;

  //console.log(jsonData[0].data.coordinates);

  geoJSON['properties']['tv_show'] = tv_array[getRandomInt(10)];

  myObject.push(geoJSON);
  console.log(geoJSON);
}

//add FeatureCollection wrap to data
const geoWrap = {
  type: 'FeatureCollection',
  features: myObject,
};

var geoConvert = JSON.stringify(geoWrap);
fs.writeFile('pulled_data_load.geojson', geoConvert, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
  console.log('JSON file for geoJSON file has been saved.');
});

//create data filters
const coca_filter = ['in', 'product', 'Coca-cola'];
const fanta_filter = ['in', 'product', 'Fanta'];
const positive_sent_filter = ['in', 'sentiment', 'positive'];
const negative_sent_filter = ['in', 'sentiment', 'negative'];
const demo_country_filter = ['==', 'country_code', 'CHN'];

// write various filters to geojsons. Have to filter raw geojson as mapbox cluster layer doesn't allow filter application after intialisation
var coca = JSON.stringify(geoFilter(geoWrap, coca_filter));
fs.writeFile('coke_only.geojson', coca, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

//geojson for coke + pos sent
var coca_pos = JSON.stringify(geoFilter(geoWrap, ['all', coca_filter, positive_sent_filter]));
fs.writeFile('coke_pos.geojson', coca_pos, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

//geojson for coke + neg sent
var coca_neg = JSON.stringify(geoFilter(geoWrap, ['all', coca_filter, negative_sent_filter]));
fs.writeFile('coke_neg.geojson', coca_neg, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

var fanta = JSON.stringify(geoFilter(geoWrap, fanta_filter));
fs.writeFile('fanta_only.geojson', fanta, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

var fanta_pos = JSON.stringify(geoFilter(geoWrap, ['all', fanta_filter, positive_sent_filter]));
fs.writeFile('fanta_pos.geojson', fanta_pos, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

var fanta_neg = JSON.stringify(geoFilter(geoWrap, ['all', fanta_filter, negative_sent_filter]));
fs.writeFile('fanta_neg.geojson', fanta_neg, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});
// eslint-disable-next-line no-unused-vars
var country_demo = JSON.stringify(geoFilter(geoWrap, demo_country_filter));
fs.writeFile('country_demo.geojson', coca, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});
