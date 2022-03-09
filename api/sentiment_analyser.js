//install npm install multilang-sentiment
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

//carry out analysis on each posts in json payload
for (i = 0; i<jsonData['data'].length; i++){
  var text = jsonData['data'][i]["text"];

  //Add sentiment field to the json object
  jsonData['data'][i]['sentiment'] = analysis(text);
}

console.log(jsonData);

var updatedJson = JSON.stringify(jsonData);
console.log(updatedJson);

//create updated json file and store data with sentiment field as updated.json
fs.writeFile("updated.json", updatedJson, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
