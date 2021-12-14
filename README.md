# CM2305 - 28

Web Application for CM2305

### Software Requirements
1. [NodeJS](https://nodejs.org/en/download/) 16.6+
2. [WAMP Server](https://www.wampserver.com/en/) (Includes PHP, Apache2, MySQL), for production can install these manually.

### How to the website
1. Install WAMP
2. Put CM2305 web files (excluding API folder) to /var/www of WAMP
3. You can now open the website in your localhost

### How to run the API (Required)
1. Install NodeJS
2. Navigate to /api folder and run npm install in console/cmd
3. To start the api you run the app.js file with "node app.js" or "nodemon app.js"

### How to run API tests
1. Make sure you have created a .env file to your /api folder and put the TWITTER_TOKEN env variable in.
2. Make sure you are in /api folder and run "npm run test"

## How to run Website tests
1. Install [Composer](https://getcomposer.org/download/)
2. Run "composer install" in the root directory of the project (Where website files are located at)
3. Enable XDEBUG module in your php.ini if hasn't been enabled by default.
4. Run "XDEBUG_MODE=coverage composer run-script phpunit", which will run the composer script to run PHP tests.

### Environment variables (.env file)
```TWITTER_TOKEN=yourbearerauthkey```


