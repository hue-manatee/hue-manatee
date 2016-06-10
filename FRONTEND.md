[![Build Status](https://travis-ci.org/hue-manatee/hue-manatee.svg?branch=staging)](https://travis-ci.org/hue-manatee/hue-manatee)

# hue-manatee
A full stack app designed to interface with philips hue bridge and light technology using Node and AngularJS.

## About hue-manatee
For documentation about acquiring your hue bridge IP and registering new User IDs see the [hue documentation](http://www.developers.meethue.com/)

## Deployed At:
### https://hue-manatee.herokuapp.com/

## dependencies
* express
* mongoose
* body-parser
* superagent
* jsonwebtoken
* bcrypt

## dev dependencies
* angular
* angular-mocks
* angular-route
* chai
* chai-http
* gulp
* gulp-mocha
* gulp-eslint
* gulp-minify-css
* gulp-sass
* gulp-sourcemaps
* html-loader
* jasmine-core
* karma
* karma-chrome-launcher
* karma-jasmine
* mocha
* webpack-stream

## Sign up/Login
When you first get to our webpage you be directed to either signup for an account or login in to your previous account.  

Usernames must be at least 8 characters long, and can be a maximum 24 characters long.

The password must be 8 characters long, and can be a maximum 255 characters long and must have at least one uppercase letter, at least one lowercase letter, and at least one number.

## Registering a Bridge
Before you can "create" a bridge within our application you must first make sure you have registered your bridge using the Hue documents [hue documentation](http://www.developers.meethue.com/documentation/getting-started).
When inputing the information into our form on the Bridge page give it a **name** and the **Bridge Key** (the information on how to obtain this unique identifier is provided for you via the hue documentation). The third input on the Bridge page is a **URL**. With this you must make sure you are able to securely expose your local bridge IP to the world. To do this we suggest a secure tunneling interface such as [ngrok](https://ngrok.com/) or some other form of SSH tunneling.

## Adding a Light
Once you have created a bridge you can add lights to your account.
Go to the create light page and input the default values that you want for this particular light.

Light inputs are:
* Light Name
* Bridge Light Id (required)
* On/Off: turns light on or off
* Groups: You can add as many groups as you want to a light
* Color: These must be hex values and can accept values with or without leading # symbol.
* Brightness (0 - 254, light brightness)
* Colorloop (on/off) infinite looping of colors)
* Alert (select(single flash) or select (loop flash), of the current color)

## Manipulating Lights

#### All Lights/Group Lights

Once you have created a couple of lights you may want to start to manipulate lights in groups or as a whole. Go to the All lights route or the Group route where you can change the status of all the lights.

#### Individual Lights

At the bottom of each group's section (and at the bottom of the all lights page) you can see the individual lights that make up the group and link to their individual manipulation page.
