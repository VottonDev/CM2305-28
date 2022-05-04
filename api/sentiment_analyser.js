//install npm install multilang-sentiment
var sentiment = require('multilang-sentiment');
const fs = require('fs');

//check if statement is positivie or negative and ouputs statement and its compund score
function analysis(text) {
  var texts = sentiment(text);
  if (texts.score >= 0) {
    var score = 'positive';
  } else if (texts.score < 0) {
    var score = 'negative';
  }
  return score;
}

//read in json payload
const jsonData = require('./json.json');

// hold all objects to later convert to JSON file
var text_temp = ' ';
var author_temp = ' ';
var geoArray = [];

//carry out analysis on each posts in json payload
for (i = 0; i < jsonData['data'].length; i++) {
  //created object for geoJSON variable
  const geoJSON = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [] },
    properties: { text: ' ', author_id: ' ', sentiment: ' ' },
  };

  // add field values to geoJSON object
  text_temp = jsonData['data'][i]['text'];
  author_temp = jsonData['data'][i]['author_id'];

  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  //Add sentiment field to the json object
  jsonData['data'][i]['sentiment'] = analysis(jsonData['data'][i]['text']);
  geoJSON['properties']['sentiment'] = analysis(jsonData['data'][i]['text']);

  var temp = geoJSON;
  geoArray.push(temp);
}

var geoConvert = JSON.stringify(geoArray);
var updatedJson = JSON.stringify(jsonData);

//create updated json file and store data with sentiment field as updated.json
fs.writeFile('updated.json', updatedJson, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  console.log('JSON file has been saved.');
});

// create geo.json file for formatting required in map box
fs.writeFile('geo.json', geoConvert, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  console.log('JSON file for geoJSON file has been saved.');
});
