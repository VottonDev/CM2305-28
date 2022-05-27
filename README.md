CM2305 Cardiff University Group Project (Social media sentiment analyser)

To run the project, you need the following programs:<br>
NodeJS (https://nodejs.org/en/)<br>
PHP (https://www.php.net/)<br>
A webserver (e.g. Apache)<br>
MySQL Database (https://www.mysql.com/)<br>
A SMTP server (e.g. Mailgun) (Optional)

Alternatively:<br>
WAMP (https://www.wampserver.com/) (Windows only)

Other requirements:<br>
Twitter API access (https://developer.twitter.com/en/apps)<br>
Trakt API access (https://trakt.tv/oauth/applications)<br>
Mapbox API access (https://www.mapbox.com/developers/api/overview/)<br>
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
