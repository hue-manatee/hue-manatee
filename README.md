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


## Using Deployed Client (instructions for local deployment in DEVDOCS.md)
Before making requests you will have to signup for an account or login in to your previous account.  Usernames must be at least 8 characters long, and can be a maximum 24 characters long.  The password must be 8 characters long, and can be a maximum 255 characters long and must have at least one uppercase letter, at least one lowercase letter, and at least one number.

### Signup:
```
http POST https://hue-manatee.herokuapp.com/api/signup username="ExampleUsername" password="ExamplePassword123"
```
The return of a signup request is a Web Token, which you should keep on hand to make requests to protected routes.
Example SignUp Request:
```
http POST https://hue-manatee.herokuapp.com/api/signup username="billy bob" password="MuchPassword123"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI1NzI3OTIyMzUyNmJjYzNiNDYxZTc2OGQiLCJpYXQiOjE0NjIyMTExMDd9.jk68R6hEBQhS02DnsYfIMTdzlOTelXyHfiybHR0kxIs"
}
```

### LogIn:
```
http -a username:password https://hue-manatee.herokuapp.com/api/login
```
Example:
```
http -a billy\ bob:MuchPassword123 https://hue-manatee.herokuapp.com/api/login
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI1NzI3OWMxYjg4YTJlN2IwNDdkNmE2MTkiLCJpYXQiOjE0NjIyMTM2ODR9.dqBUQfhybl_vAqU36TE2yevlXLyu3Dgweng3X28pdfA"
}
```

## Registering a bridge
Make sure you have registered your bridge using the Hue documents [hue documentation](http://www.developers.meethue.com/documentation/getting-started).  Also make sure you are able to securely expose your local bridge IP to the world.  We suggest a secure tunneling interface such as [ngrok](https://ngrok.com/) or some other form of SSH tunneling. Once your bridge is linked and you have your bridge access and unique username, you can register your bridge with the hue-manatee interface using a POST request and your auth token from above.  This request will also set the current logged in user as the bridge admin.  Send a POST request to
```
  https://hue-manatee.herokuapp.com/api/bridge/create
```
The post data should be sent in JSON format, and you will need to send the following fields:
```
{
  "name": "Your Name Here",
  "ip": "access to bridge IP here (ngrok url)",
  "bridgeUserId": "hue bridge unique username here"
}
```
You can also use a tool like [httpie](https://github.com/jkbrzt/httpie) to make this request.  This would look like:
```
http POST https://hue-manatee.herokuapp.com/api/bridge/create name="Your bridge name here" ip="access to bridge IP here" bridgeUserId="your hue bridge username here" token:"your unique token here"
```
Once your bridge is registered, you can access information about the lights attached to that bridge by sending a GET request to
```
https://hue-manatee.herokuapp.com/api/bridge/status/_Your_bridgeUserId_Here_
```
The httpie call would look like this:
```
http https://hue-manatee.herokuapp.com/api/bridge/status_Your_bridgeUserId_Here_ token:"unique token here"
```
You can also update your bridge by sending a PUT request to
```
https://hue-manatee.herokuapp.com/api/bridge/update/_Your_bridgeUserId_Here_
```
The httpie call would look like this:
```
http https://hue-manatee.herokuapp.com/api/bridge/update/_Your_bridgeUserId_Here_ token:"unique token here" name="new name here" ip="new ngrok url"
```

## Add Your Lights
After your bridge is registered you can find all lights associated with your bridge. See [hue documentation](http://www.developers.meethue.com/documentation/getting-started) for more info. Your light IDs will be 1, 2, 3 etc...  To create a light, send a POST request to
```
https://hue-manatee.herokuapp.com/api/light/create
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
http POST https://hue-manatee.herokuapp.com/api/light/create token:"unique token here" lightName="name" bridgeLightId="3" groups="['livingroom','ceiling']" hue="10000" sat="254" bri="100" on="true"
```
Once your light is added, you can get the connection status of that light from the bridge by sending a GET request to that individual lightId (1, 2, 3, etc)
```
https://hue-manatee.herokuapp.com/api/light/status/_Your_lightId_Here_
```
The httpie call would look like this:
```
http https://hue-manatee.herokuapp.com/api/light/status/_Your_lightId_Here_ token:"unique token here"
```
You can also update a light by sending a PUT request to
```
https://hue-manatee.herokuapp.com/api/light/update/_Your_lightId_Here_
```
The httpie call would look like this:
```
http https://hue-manatee.herokuapp.com/api/light/update/_Your_lightId_Here_ token:"unique token here" lightName="new name here"
```

## Routes
Let's start making requests! You can use [httpie](https://github.com/jkbrzt/httpie).

### Change State of Light
To make changes to the state of the light, you send get requests to
```
https://hue-manatee.herokuapp.com/api/light/magic
```
Here is where the fun begins.  Properties on the light can be accessed through a simple query string appended to the end of the url, making it accessible through many places. The only mandatory field is the lightId.

An httpie example would look like:
```
http GET https://hue-manatee.herokuapp.com/api/light/magic token:"unique token here" lightId==3 hue==0 bri==254
```
This this request grabs light number 3, turns the hue to red (0) and the brightness to max (254).  You have access to the following properties (lightId required):
* lightId (required)
* on (true/false, turns light on or off)
* hue (0 - 65535, color of the light)
* sat (0 - 254, color saturation)
* bri (0 - 254, light brightness)
* red (0 - 255, rgb red value)
* green (0 - 255, rgb green value)
* blue (0 - 255, rgb blue value)

Please note that the presence of an red, green, blue, or hex value will supersede the hue/sat values if both are passed.

### Reset Light to default

When you create or update a light you can set it's default: state, bri, hue, sat. By visiting the reset route the target light will return to whatever the default was upon creation. If you didn't set a default one was generated for you.

```
https://hue-manatee.herokuapp.com/api/light/reset/_Your_lightId_Here_
```

example
```
http GET https://hue-manatee.herokuapp.com/api/light/reset/3 token:_unique_token_here_
```
