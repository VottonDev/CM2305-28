const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_API_KEY);


// get a list of configured blogs for the calling user
// GET /api/flickr/blogs
exports.getBlogs = (req, res) => {
    flickr.blogs.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get the contact list for a user
// GET /api/flickr/contacts
exports.getContacts = (req, res) => {
    flickr.contacts.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};

// return a list of favourite public photos for the given user
// GET /api/flickr/favorites
exports.getFavorites = (req, res) => {
    flickr.favorites.getList(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get information about a user
// GET /api/flickr/user
exports.getUser = (req, res) => {
    flickr.people.getInfo(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get geolocations data
// GET /api/flickr/geo
exports.getGeo = (req, res) => {
    flickr.places.getInfo(req.user.flickr.access_token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// return a list of photos matching criteria
// GET /api/flickr/photos
exports.getPhotos = (req, res) => {
    flickr.photos.search(req.user.flickr.access_token, req.query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get information about a photo
// GET /api/flickr/photos/:id
exports.getPhoto = (req, res) => {
    flickr.photos.getInfo(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};



// return the list of people who have favourited a given photo
// GET /api/flickr/photos/:id/favourites
exports.getPhotoFavourites = (req, res) => {
    flickr.photos.getFavorites(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get comments for a photo
// GET /api/flickr/photos/:id/comments
exports.getPhotoComments = (req, res) => {
    flickr.photos.comments.getList(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// get the geo data for a photo
// GET /api/flickr/photos/:id/geo
exports.getPhotoGeo = (req, res) => {
    flickr.photos.geo.getLocation(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};


// return a list of photos for the calling user at a specific latitude, longitude and accuracy
// GET /api/flickr/photos/geo/:lat/:lon/:accuracy
exports.getPhotosGeo = (req, res) => {
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
};


// return a list of people in a given photo
// GET /api/flickr/photos/:id/people
exports.getPhotoPeople = (req, res) => {
    flickr.photos.people.getList(req.user.flickr.access_token, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
};

module.exports = app;