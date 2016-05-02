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

## Routes
Let's start making requests! You can use [httpie](https://github.com/jkbrzt/httpie)

Before making requests you will have to signup for an account or login in to your previous account.

### Signup:
```
http POST localhost:PORT/api/signup username="example username" password="example password"
```
The return of a signup request is a Web Token, which you should keep on hand to make requests to protected routes.
Example SignUp Request:
```
http POST localhost:5555/api/signup username="billy bob" password="much password"
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
http -a username:password http://localhost:PORT/api/login
```
Example:
```
http -a billy\ bob:much\ password http://localhost:5555/api/login
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
