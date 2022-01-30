const express = require('express');
const app = express();

// Flickr get geolocation data of an image      
app.get('/get_geolocation', (req, res) => {
    let photo_id = req.params.photo_id;

    const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation`, {
        params: {
            query: photo_id,
        },
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});

module.exports = app;