const sentiment = require('multilang-sentiment');
const fs = require('fs');

//check if statement is positive or negative and outputs statement and its compound score
function analysis(text){

    let score;
    const texts = sentiment(text);
    if(texts.score>=0){
        score = 'positive';
    }
    else if (texts.score < 0){
      score = 'negative';
    }
    return score;
}

//read in json payload
const jsonData= require('./json.json');

// hold all objects to later convert to JSON file
let text_temp = " ";
let author_temp = " ";
const geoArray = [];

//carry out analysis on each posts in json payload
for (let i = 0; i<jsonData['data'].length; i++){

  //created object for geoJSON variable
  const geoJSON = {
    type: "Feature",
    geometry: {type: "Point", coordinates: []},
    properties:{text: " ", author_id: " ", sentiment: " "}
  };

  // add field values to geoJSON object
  text_temp = jsonData['data'][i]['text'];
  author_temp = jsonData['data'][i]['author_id'];

  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  //Add sentiment field to the json object
  jsonData['data'][i]['sentiment'] = analysis(jsonData['data'][i]["text"]);
  geoJSON['properties']['sentiment'] = analysis(jsonData['data'][i]["text"]);

    const temp = geoJSON;
    geoArray.push(temp);

}

const geoConvert = JSON.stringify(geoArray);
const updatedJson = JSON.stringify(jsonData);

//create updated json file and store data with sentiment field as updated.json
fs.writeFile("updated.json", updatedJson, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});

// create geo.json file for formatting required in map box
fs.writeFile("geo.json", geoConvert, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file for geoJSON file has been saved.");
});
