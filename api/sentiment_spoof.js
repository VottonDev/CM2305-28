var sentiment = require('multilang-sentiment');
const fs = require('fs');

//check if statement is positivie or negative and ouputs statement and its compund score
function analysis(text){

    var texts = sentiment(text);
    if(texts.score>=0){
      var score = 'positive';
    }
    else if (texts.score < 0){
      var score = 'negative';
    }
    return score;
}

//read in json payload
const jsonData= require('./json.json');

var prev_data = fs.readFileSync('pulled_data_load.geojson');
var myObject = JSON.parse(prev_data);

// hold all objects to later convert to JSON file
var text_temp = " "
var author_temp = " "
geoArray = [];
tv_array = ["Better Call Saul","Ozark","FBI","Moon Knight","Halo","This Is Us","Star Trek: Picard","MasterChef Australia","New Amsterdam","The Resident"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


//carry out analysis on each posts in json payload
for (i = 0; i<jsonData.length; i++){

  //created object for geoJSON variable
  geoJSON = {
    type: "Feature",
    properties:{text: " ", author_id: " ", sentiment: " ", tv_show: " ", product:" "},
    geometry: {type: "Point", coordinates: []}
  };

  // add field values to geoJSON object
  text_temp = jsonData[i].data.text;
  author_temp = jsonData[i].data.author_id;
  country_code_temp = jsonData[i].data.country_code;
  coordinates = jsonData[i].data.coordinates;
  product_temp = jsonData[i].data.product;

  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  //Add sentiment field to the json object
  //jsonData['data'][i]['sentiment'] = analysis(jsonData['data'][i]["text"]);
  geoJSON['properties']['sentiment'] = analysis(text_temp);
  geoJSON['geometry']['coordinates'] = coordinates;
  geoJSON['properties']['product'] = product_temp;

  //console.log(jsonData[0].data.coordinates);

  geoJSON['properties']['tv_show'] = tv_array[getRandomInt(10)];

  myObject.push(geoJSON);
  console.log(geoJSON);


}


  var geoConvert = JSON.stringify(myObject);

  /*
//create FeatureCollection wrap for geojson file
const geoWrap = {
  "type": "FeatureCollection",
  "features": myObject
};

var geoWrapConvert = JSON.stringify(geoWrap);
*/


  fs.writeFile("pulled_data_load.geojson", geoConvert, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file for geoJSON file has been saved.");
  });
