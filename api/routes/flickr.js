const express = require('express');
const app = express();
const axios = require('axios').default;

// Flickr get geolocation data of an image      
app.get('/get_geolocation', async (req, res) => {
    let photo_id = req.params.photo_id;
    let token = req.params.token;
    const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation`, 
    {
        params: {
            query: photo_id,
        },
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
  );
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(401).json(response.data);
  }
});

module.exports = app;