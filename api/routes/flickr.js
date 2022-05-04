const express = require('express');
const axios = require("axios");
const app = express();


// get a list of configured blogs for the calling user
app.get('/get_blog', async (req, res) => {
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.blogs.getList',
    {
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get the contact list for a user
app.get('/get_contactsPublic', async (req, res) => {
    let contact_id = req.params.user_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.contacts.getPublicList',
    {
        params: {
            query: contact_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// return a list of favourite public photos for the given user
app.get('/get_favouritePublicPhoto', async (req, res) => {
    let favourite_id = req.params.user_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.favorites.getPublicList',
    {
        params: {
            query: favourite_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get information about a user
app.get('/get_peopleInfo', async (req, res) => {
    let peopleinfo_id = req.params.user_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.people.getInfo',
    {
        params: {
            query: peopleinfo_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get geolocations data
app.get('/get_photoGeoData', async (req, res) => {
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.getWithGeoData',
    {
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// return a list of photos matching criteria
app.get('/get_visiblePhoto', async (req, res) => {
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.search',
    {
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get information about a photo
app.get('/get_photoInfo', async (req, res) => {
    let photoInfo_id = req.params.photo_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.getInfo',
    {
        params: {
            query: photoInfo_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// return the list of people who have favourited a given photo
app.get('/get_photoFavourites', async (req, res) => {
    let photoFavourites_id = req.params.photo_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.getInfo',
    {
        params: {
            query: photoFavourites_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get comments for a photo
app.get('/get_photoComments', async (req, res) => {
    let photoComments_id = req.params.photo_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.comments.getList',
    {
        params: {
            query: photoComments_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// get the geo data for a photo
app.get('/get_geolocation', async (req, res) => {
    let photo_id = req.params.photo_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.geo.getLocation',
    {
        params: {
            query: photo_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// return a list of photos for the calling user at a specific latitude, longitude and accuracy
app.get('/get_geoPhotoLocation', async (req, res) => {
    let api_key = req.params.api_key;
    let latitude = req.params.lat;
    let lontitude = req.params.lon;
    let accuracy = req.params.accuracy;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.geo.photosForLocation',
    {
        params: {
            latitude: latitude,
            longtitude: lontitude,
            accuracy: accuracy,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});


// return a list of people in a given photo
app.get('/get_peopleInPhoto', async (req, res) => {
    let people_id = req.params.people_id;
    let api_key = req.params.api_key;
    const response = await axios.get(
        'https://www.flickr.com/services/api/flickr.photos.people.getList',
    {
        params: {
            query: people_id,
        },
        headers: {
            Authorization: 'Bearer ' + api_key,
        },
    });
    if (response.status === 200) {
        res.status(200).json(response.data);
    } else {
        res.status(401).json(response.data);
    }
});



module.exports = app;
