[![Build Status](https://travis-ci.org/hue-manatee/hue-manatee.svg?branch=staging)](https://travis-ci.org/hue-manatee/hue-manatee)

# hue-manatee
A node REST api designed to interface with philips hue bridge and light technology.

## About hue
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

## Registering a bridge
* Make sure you have registered your bridge using the Hue documents [hue documentation](http://www.developers.meethue.com/documentation/getting-started)
* Once your bridge is linked and you have your bridge IP and unique username, you can register your bridge with the hue-manatee interface using a POST request.  Send a POST request to `localhost:PORT/api/bridge`.  The post data should be sent in JSON format, and you will need to send the following fields:
```
{
  "name": "Your Name Here",
  "ip": "hue bridge IP here",
  "bridgeUserId": "hue bridge unique username here"
}
```
Once these are sent, the current logged in user is set as the bridge admin.
* Once your bridge is registered, you can access information about the lights attached to that bridge by sending a GET request to `localhost:PORT/api/_Your_bridgeUserId_Here_`.
