const fs = require('fs');

const prev_data = fs.readFileSync('pulled_data_load.geojson');

geoConvert = prev_data;

fs.writeFile("pulled_data_load.geojson", geoConvert, 'utf8', function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("geoJSON file has been saved.");
});
