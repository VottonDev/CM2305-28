const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_API_KEY);
// Get flickr access token
const express = require('express');
const app = express();

// get a list of configured blogs for the calling user
app.get('/get_blogs', (res) => {
  flickr.blogs.getList({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get the contact list for a user
app.get('/get_contacts', (res) => {
  flickr.contacts.getList({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// return a list of favourite public photos for the given user
app.get('/get_favourites', (res) => {
  // Pass the user id to the function
  flickr.favorites.getList({ user_id: req.query.user_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get information about a user
app.get('/get_user', (res) => {
  flickr.people.getInfo({ user_id: req.query.user_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// return a list of photos matching criteria
app.get('/search_photos', (res) => {
  // Pass the user id to the function
  flickr.photos.search({ user_id: req.query.user_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get information about a photo
app.get('/get_photo', (res) => {
  flickr.photos.getInfo({ photo_id: req.query.photo_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// return the list of people who have favourited a given photo
app.get('/get_favourited_people', (res) => {
  // Pass the user id to the function
  flickr.photos.getFavorites({ photo_id: req.query.photo_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get comments for a photo
app.get('/get_comments', (res) => {
  // Pass the photo id to the function
  flickr.photos.comments.getList({ photo_id: req.query.photo_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get the geo data for a photo
app.get('/get_photo_geo', (res) => {
  // Pass the photo id to the function
  flickr.photos.geo.getLocation({ photo_id: req.query.photo_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// return a list of photos for the calling user at a specific latitude, longitude and accuracy
app.get('/get_photos_at_location', (res) => {
  // Pass the geo to the function
  flickr.photos.search({ lat: req.query.lat, lon: req.query.lon, accuracy: req.query.accuracy }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// return a list of people in a given photo
app.get('/get_people_in_photo', (res) => {
  // Pass the photo id to the function
  flickr.people.getList({ photo_id: req.query.photo_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = app;
