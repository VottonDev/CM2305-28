const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const vader = require('vader-sentiment');
var fs = require('fs');
var input = fs.readFileSync('test.txt', 'utf8')
const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(input);

fs.readFile('test.txt', function(err, data) {
if(err) throw err;

const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

for(let i of arr) {
    console.log(i);
    var temp_intensity = vader.SentimentIntensityAnalyzer.polarity_scores(i);
    console.log(temp_intensity);
    if(temp_intensity.compound > 0){
      var score = 'positive statement';
    }
    else{
      var score = 'negative statement';
    }
    console.log(score);
}
});

const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
//res.end('Checking compound value for lines in text file, less than 0 is negative and more than 0 is positive');
});

server.listen(port, hostname, () => {
//console.log(Server running at http://${hostname}:${port}/);
console.log('Checking compound value for lines in text file, less than 0 is negative and more than 0 is positive');
console.log();
});
