CM2305 Cardiff University Group Project (Social media sentiment analyser)

To run the project, you need the following programs:
NodeJS (https://nodejs.org/en/)
PHP (https://www.php.net/)
A webserver (e.g. Apache)
MySQL Database (https://www.mysql.com/)
A SMTP server (e.g. Mailgun) (Optional)

Alternatively:
WAMP (https://www.wampserver.com/) (Windows only)

Other requirements:
Twitter API access (https://developer.twitter.com/en/apps)
Trakt API access (https://trakt.tv/oauth/applications)
Mapbox API access (https://www.mapbox.com/developers/api/overview/)
Flickr API access (https://www.flickr.com/services/api/misc.api_keys.html) (Optional)

You need to create a .env file in the api directory of the project with the following variables:
```
MYSQL_HOST=localhost
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
MAIL_HOST=""
MAIL_USER=""
MAIL_PASSWORD=""
TWITTER_TOKEN=""
FLICKR_API_KEY=""
TRAKT_CLIENT_ID=""
TRAKT_CLIENT_SECRET=""
```

Commands for API:
```
cd api
```
```
npm install
```
```
node app.js or npm run dev
```