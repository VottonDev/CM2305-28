const Flickr = require('flickr-sdk');
const flickr = new Flickr.OAuth(process.env.FLICKR_API_KEY, process.env.FLICKR_API_SECRET);
// Get flickr access token
const express = require('express');
const app = express();

// get a list of configured blogs for the calling user
app.get('/get_blogs', (req, res) => {
    flickr.blogs.getList({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// get the contact list for a user
app.get('/get_contacts', (req, res) => {
    flickr.contacts.getList({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// return a list of favourite public photos for the given user
app.get('/get_favourites', (req, res) => {
    // Pass the user id to the function
    flickr.favorites.getList({ user_id: req.query.user_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// get information about a user
app.get('/get_user', (req, res) => {
    flickr.people.getInfo({ user_id: req.query.user_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// return a list of photos matching criteria
app.get('/search_photos', (req, res) => {
    // Pass the user id to the function
    flickr.photos.search({ user_id: req.query.user_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);


// get information about a photo
app.get('/get_photo', (req, res) => {
    flickr.photos.getInfo({ photo_id: req.query.photo_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// return the list of people who have favourited a given photo
app.get('/get_favourited_people', (req, res) => {
    // Pass the user id to the function
    flickr.photos.getFavorites({ photo_id: req.query.photo_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// get comments for a photo
app.get('/get_comments', (req, res) => {
    // Pass the photo id to the function
    flickr.photos.comments.getList({ photo_id: req.query.photo_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);  

// get the geo data for a photo
app.get('/get_photo_geo', (req, res) => {
    // Pass the photo id to the function
    flickr.photos.geo.getLocation({ photo_id: req.query.photo_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// return a list of photos for the calling user at a specific latitude, longitude and accuracy
app.get('/get_photos_at_location', (req, res) => {
    // Pass the geo to the function
    flickr.photos.search({ lat: req.query.lat, lon: req.query.lon, accuracy: req.query.accuracy }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

// return a list of people in a given photo
app.get('/get_people_in_photo', (req, res) => {
    // Pass the photo id to the function
    flickr.people.getList({ photo_id: req.query.photo_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }
    );
}
);

module.exports = app;