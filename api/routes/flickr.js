const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_API_KEY, process.env.FLICKR_API_SECRET);
const express = require('express');
const app = express();


// get a list of configured blogs for the calling user
app.get('/get_blogs', (req, res) => {
    flickr.blogs.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get the contact list for a user
app.get('/get_contacts', (req, res) => {
    flickr.contacts.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});

// return a list of favourite public photos for the given user
app.get('/get_favourites', (req, res) => {
    flickr.favorites.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get information about a user
app.get('/get_user', (req, res) => {
    flickr.people.getInfo(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get geolocations data for a user
app.get('/get_geo', (req, res) => {
    flickr.places.getInfo(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// return a list of photos matching criteria
app.get('/search_photos', (req, res) => {
    flickr.photos.search(req.user.flickr.access_token, req.query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get information about a photo
app.get('/get_photo', (req, res) => {
    flickr.photos.getInfo(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});



// return the list of people who have favourited a given photo
app.get('/get_favourited_people', (req, res) => {
    flickr.photos.getFavorites(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get comments for a photo
app.get('/get_comments', (req, res) => {
    flickr.photos.comments.getList(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// get the geo data for a photo
app.get('/get_photo_geo', (req, res) => {
    flickr.photos.geo.getLocation(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// return a list of photos for the calling user at a specific latitude, longitude and accuracy
app.get('/get_photos_at_location', (req, res) => {
    flickr.photos.search(req.user.flickr.access_token, {
        lat: req.params.lat,
        lon: req.params.lon,
        accuracy: req.params.accuracy
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});


// return a list of people in a given photo
app.get('/get_people_in_photo', (req, res) => {
    flickr.photos.people.getList(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});

module.exports = app;