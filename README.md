# Project walk through

This web app is website that displays image of given place and weather forcast of 16 days on given place.

I used following things in project:
- Webpack
- Sass
- Webpack Loaders and Plugins
- Service workers

I used 3 APIs and chained them eachather in this project.
APIs are:
1) [Geonames](https://www.geonames.org/) API (to get latitutde and altitude of given any place name)
2) [Weatherbit](https://www.weatherbit.io/features) API (with latitude and altitude by geonames API, we can take 16 days weather forcast, including temperature, rain , snow and etc.)
3) [Unsplash](https://unsplash.com/documentation#list-photos) APi (to get place image by given place name)


# Getting started

Remember that once you clone, you will need to install everything:

`cd` into project root:
- `npm install`

## Setting up the API

## Step 1: Signup for an APIs key
First, you will need to go all above API webstes. And signing up will get you APIs key.


## Step 2: Set up the API key
In the project root craete ```.env``` file and write your API key down:
  ```
  API_KEY = "*****************************"
  ```

## Step 3: Environment Variables
Next we need to declare our API keys, which will look something like this:
```
  const API_KEY = process.env.API_KEY,

```
You do not have to import API_KEY from ```.env``` file. In this project, ```dotenv-webpack``` plugin is used, it will do all works in the obehind.
## Step 4: NPM script commands

All necesseryt script commands are set:
```
//package.json

...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server/index.js",
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack-dev-server  --config webpack.dev.js --open"
...
```

## Deploying

I used [Netlify](https://www.netlify.com/) to deploy, other option you can use [Heroku](https://www.heroku.com/).
You can see the project [here](https://udacity-travel-prod.netlify.app/)
