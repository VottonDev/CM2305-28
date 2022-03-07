//install npm install multilang-sentiment
var sentiment = require('multilang-sentiment');

//check if statement is positivie or negative and ouputs statement and its compund score
function analysis(text){
    console.log();
    var texts = sentiment(text);
    console.log(texts.score);
    if(texts.score>0){
      var score = 'positive statement';
    }
    else if (texts.score < 0){
      var score = 'negative statement';
    }
    else {
      var score = "neutral"
    }
    return score;
}

//read in json payload
const jsonData= require('./json.json');

//carry out analysis on each posts in json payload
for (i = 0; i<jsonData['data'].length; i++){
  var text = jsonData['data'][i]["text"];
  console.log(text);
  console.log(analysis(text));
}
