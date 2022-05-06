//install npm install multilang-sentiment
var sentiment = require('multilang-sentiment');
const fs = require('fs');
var tv_show = require('./tv_shows.js')

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

var prev_data = fs.readFileSync('pulled_data3.geojson');
var myObject = JSON.parse(prev_data);

// hold all objects to later convert to JSON file
var text_temp = " "
var author_temp = " "
geoArray = [];
global.tempshow  = " ";
global.geoJSON  = {};

//carry out analysis on each posts in json payload
for (i = 0; i<jsonData.length; i++){

  //created object for geoJSON variable
  geoJSON = {
    type: "Feature",
    properties:{text: " ", author_id: " ", sentiment: " ", tv_show: " "},
    geometry: {type: "Point", coordinates: []}
  };

  // add field values to geoJSON object
  text_temp = jsonData[i].data.text;
  author_temp = jsonData[i].data.author_id;
  country_code_temp = jsonData[i].data.country_code;

  geoJSON['properties']['text'] = text_temp;
  geoJSON['properties']['author_id'] = author_temp;
  //Add sentiment field to the json object
  //jsonData['data'][i]['sentiment'] = analysis(jsonData['data'][i]["text"]);
  geoJSON['properties']['sentiment'] = analysis(text_temp);
  geoJSON['geometry']['coordinates'] = jsonData[0].data.coordinates;

  geoJSON['properties']['tv_show'] =tv_show(country_code_temp).then(show => {
  geoJSON['properties']['tv_show'] = show;
  tempshow = show;
  //console.log(geoJSON);
}
).catch(err => {
  geoJSON['properties']['tv_show'] = " ";
}
);


}

setTimeout(function() {
  for (i = 0; i<jsonData.length; i++){
    geoJSON['properties']['tv_show'] = tempshow;
    var temp = geoJSON;
    console.log(temp);
    //geoArray.push(temp);
    myObject.push(temp);

  }
  var geoConvert = JSON.stringify(myObject);
  fs.writeFile("pulled_data3.geojson", geoConvert, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file for geoJSON file has been saved.");
}
);
}, 2000);
