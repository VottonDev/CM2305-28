# CM2305 - 28

Web Application for CM2305

### Software Requirements
1. [NodeJS](https://nodejs.org/en/download/) 16.6+
2. [WAMP Server](https://www.wampserver.com/en/) (Includes PHP, Apache2, MySQL), for production can install these manually.

### How to run the website
1. Install [WAMP](https://www.wampserver.com/en/)
2. Put CM2305 web files (excluding API folder) to /var/www of WAMP
3. You can now open the website in your localhost

### How to run the API (Required)
1. Install [NodeJS](https://nodejs.org/en/download/)
2. Navigate to /api folder and run npm install in console/cmd)
3. Create a .env file and create MySQL environment variables listed at the bottom of the instructions.
4. Connect to Cardiff University network or use the VPN (Not required if hosting the MySQL database locally)
5. Import the db.sql into your database (Optional) (If host locally)
5. To start the api you run the app.js file with "node app.js" or "nodemon app.js"

### How to run API tests
1. Make sure you have created a .env file to your /api folder and put the TWITTER_TOKEN env variable in.
2. Make sure you are in /api folder and run "npm run test"

### How to run Website tests
1. Install [Composer](https://getcomposer.org/download/)
2. Run "composer install" in the root directory of the project (Where website files are located at)
3. Enable XDEBUG module in your php.ini if hasn't been enabled by default.
4. Run "XDEBUG_MODE=coverage composer run-script phpunit", which will run the composer script to run PHP tests.

### Docker (Unfinished)
1. Run "docker-compose up -d" in the root directory of the project (Where website files are located at)

### Environment variables (.env file)
```
   TWITTER_TOKEN="AAAAAAAAAAAAAAAAAAAAAL65WAEAAAAA%2Bz3MLAMpuqpuAbdRVV7l3WUMPxU%3DNez0849RCsrNP6MEKDGGZxYlwxENJA6TBhIOcJTW0bzG2wgHJi"
   MYSQL_HOST="csmysql.cs.cf.ac.uk"
   MYSQL_USER="c2050462"
   MYSQL_PASSWORD="Hello12345"
   MYSQL_DATABASE="c2050462_cm2305"
   MAIL_HOST="smtp.mailgun.org"
   MAIL_USER="postmaster@sandboxe732894598d74d4186370f1b1314af5e.mailgun.org"
   MAIL_PASSWORD="9fe0aa66a914978f4334870419826a8b-c3d1d1eb-2235ab4c"
   TRAKT_API_KEY=""
   ```


