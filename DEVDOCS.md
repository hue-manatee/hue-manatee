[![Build Status](https://travis-ci.org/hue-manatee/hue-manatee.svg?branch=staging)](https://travis-ci.org/hue-manatee/hue-manatee)

# hue-manatee
A node REST api designed to interface with philips hue bridge and light technology.

## About hue-manatee
For documentation about acquiring your hue bridge IP and registering new User IDs see the [hue documentation](http://www.developers.meethue.com/)

## dependencies
* express
* mongoose
* body-parser
* superagent
* jsonwebtoken
* bcrypt

## dev dependencies
* mocha
* chai
* chai-http
* gulp
* gulp-mocha
* gulp-eslint

## Testing
We are running our tests through Mocha as well as Gulp. By default Gulp will run Mocha for you. These tests will run in alphabetical order. We also, utilized TravisCI as a build tracking tool. For more details on Travis please check out the docs [here](https://docs.travis-ci.com/).

### Setup/Teardown
We have created a Setup and Teardown test file to make the process more modular. Our Setup test will create and set your local port as well as your Mongo Database to be set at "hue_test_db" to ensure that the teardown test does not drop your production database. The purpose of the Teardown test is to disconnect your Mongoose server and then drop the test database. Now onto the fun tests...

### Main Tests
The Authorization Test file includes:
> Create a new User with a valid username and password, returns a unique Token (POST request)

> Login with a valid username and password, returns a token (GET request)

> Fail to create user with a username less than 8 characters, returns error (POST request)

> Fail to create user with a username more than 24 characters, returns error (POST request)

> Fail to create user with a password less than 8 characters, returns error (POST request)

The Bridge Test file includes:
> Create a new Hue Bridge instance (POST request)

> Test the Bridge status (GET request)

> Update the Bridge (PUT request)

The Light Test file includes:
> Create a new Lightbulb (POST request)

> Update a Lightbulb (PUT request)

> Change the Lightbulb's state (GET MAGIC)

> Get the status of a single Lightbulb (GET request)

The Server Test file includes:
> Bad route test (GET request)


## Running Locally
## How to use the API:
You need to npm install dependencies and create a folder for your database.
```
npm install
```
You need to use mongod to run this application. Please refer to documentation for installation and use [mongod documentation](https://docs.mongodb.org/manual/reference/program/mongod/)
```
mongod --dbpath=./db
```
Start the server, this will tell you what port your server is running on. example 5555.
```
npm start
```

Before making requests you will have to signup for an account or login in to your previous account.  Usernames must be at least 8 characters long, and can be a maximum 24 characters long.  The password must be 8 characters long, and can be a maximum 255 characters long and must have at least one uppercase letter, at least one lowercase letter, and at least one number.

### Signup:
```
http POST localhost:PORT/api/signup username="example username" password="Example1"
```
The return of a signup request is a Web Token, which you should keep on hand to make requests to protected routes.
Example SignUp Request:
```
http POST localhost:5555/api/signup username="billy bob" password="hueAccess1"
```
and its Response in the console:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 161
Content-Type: application/json; charset=utf-8
Date: Mon, 02 May 2016 17:45:07 GMT
ETag: W/"a1-PFMz84G1/pGO87fjHVahEg"
X-Powered-By: Express
{
    "token": "this is where your token would print out"
}
```

### LogIn:
```
http -a username:password http://localhost:PORT/api/login
```
Example:
```
http -a billy\ bob:hueAccess1 http://localhost:5555/api/login
```
and its Response in the console:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 161
Content-Type: application/json; charset=utf-8
Date: Mon, 02 May 2016 18:28:04 GMT
ETag: W/"a1-ic28p+iMmlcbUrRbRwvdIg"
X-Powered-By: Express
{
    "token": "this is where your token would print out"
}
```

## Registering a bridge
Make sure you have registered your bridge using the Hue documents [hue documentation](http://www.developers.meethue.com/documentation/getting-started). Once your bridge is linked and you have your bridge IP (including http://) and unique username, you can register your bridge with the hue-manatee interface using a POST request and your auth token from above.  This request will also set the current logged in user as the bridge admin.  Send a POST request to
```
  http://localhost:PORT/api/bridge/create
```
The post data should be sent in JSON format, and you will need to send the following fields:
```
{
  "name": "Your Name Here",
  "ip": "hue bridge IP here (including http://)",
  "bridgeUserId": "hue bridge unique username here"
}
```
You can also use a tool like [httpie](https://github.com/jkbrzt/httpie) to make this request.  This would look like:
```
http POST http://localhost:PORT/api/bridge/create name="Your name here" ip="your ip here" bridgeUserId="your hue bridge username here" token:_unique_token_here_
```
Once your bridge is registered, you can access information about the lights attached to that bridge by sending a GET request to
```
http://localhost:PORT/api/bridge/status/_Your_bridgeUserId_Here_
```
The httpie call would look like this:
```
http http://localhost:PORT/api/bridge/status/_Your_bridgeUserId_Here_ token:_unique_token_here_
```
You can also update your bridge by sending a PUT request to
```
http://localhost:PORT/api/bridge/update/_Your_bridgeUserId_Here_
```
The httpie call would look like this:
```
http http://localhost:PORT/api/bridge/update/_Your_bridgeUserId_Here_ token:_unique_token_here_ name="new name here" ip="new bridge ip here"
```

## Add Your Lights
After your bridge is registered you can find all lights associated with your bridge. See [hue documentation](http://www.developers.meethue.com/documentation/getting-started) for more info. Your light IDs will be 1, 2, 3 etc...  To create a light, send a POST request to
```
http://localhost:PORT/api/light/create
```
The post data should be sent in JSON format. Hue, sat, bri, on are the default properties of the light, so you can easily return to your default settings later. The only required fields are lightName and bridgeLightId, but all these fields are available.
```
{
  "lightName": "Your Name Here",
  "bridgeLightId": "#",
  "groups": "['array','of','groups']"
  "hue": "0 to 65535"
  "sat": "0 to 254"
  "bri": "0 to 254
  "on": "true/false"
}
```
The httpie call would look like this:
```
http POST http://localhost:PORT/api/light/create token:_unique_token_here_ lightName="name" bridgeLightId="3" groups="['livingroom','ceiling']" hue="10000" sat="254" bri="100" on="true"
```
Once your light is added, you can get the connection status of that light from the bridge by sending a GET request to that individual lightId (1, 2, 3, etc)
```
http://localhost:PORT/api/light/status/_Your_lightId_Here_
```
The httpie call would look like this:
```
http http://localhost:PORT/api/light/status/_Your_lightId_Here_ token:_unique_token_here_
```
You can also update a light by sending a PUT request to
```
http://localhost:PORT/api/light/update_Your_lightId_Here_
```
The httpie call would look like this:
```
http http://localhost:PORT/api/light/update_Your_lightId_Here_ token:_unique_token_here_ lightName="new name here"
```

## Routes
Let's start making requests! You can use [httpie](https://github.com/jkbrzt/httpie). To make changes to the state of the light, you send get requests to
```
http://localhost:PORT/api/light/magic
```
Here is where the fun begins.  Properties on the light can be accessed through a simple query string appended to the end of the url, making it accessible through many places. The only mandatory field is the lightId.

An httpie example would look like:
```
http GET http://localhost:PORT/api/light/magic token:_unique_token_here_ lightId==3 hue==0 bri==254
```
This this request grabs light number 3, turns the hue to red (0) and the brightness to max (254).  You have access to the following properties (lightId required):
* lightId (required)
* on (true/false, turns light on or off)
* hue (0 - 65535, color of the light)
* sat (0 - 254, color saturation)
* bri (0 - 254, light brightness)
