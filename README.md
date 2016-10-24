# NeighborGood

> NeighborGood helps you find a neighborhood thats suitable for your needs in California. NeighborGood will provide you a score for a neighborhood based on user selected criteria.
![alt tag](/../screenshots/neighborgood.gif)

https://neighborgood-demo.herokuapp.com

## Team

  - __Product Owner__: Sergey Sarkisyan
  - __Scrum Master__: Lucy Ji
  - __Development Team Members__: Jeffrey Yoo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)


## Usage
**User will have to signup/ signin to save searches!
> Some usage instructions
```
> User may click "new search"
> User may input *New* address to find neighborhood information about that place
> User may then select whats Important for the user,
>   whether its crime score, walkability, or traffic (on click user is promoted to enter address)
> User is then shown the result page with the neighborhood information for that one search
> User is able to save search **ONLY** if user is signed in
> User may sign up and sign in to save and view saved searches results
> User may click on commute address in the saved searches results page to see best neighborhood for current address.
```
## Requirements
```
"@google/maps": "^0.2.1",
"bcrypt-nodejs": "0.0.3",
"body-parser": "^1.15.2",
"csvtojson": "^1.0.3",
"dotenv": "^2.0.0",
"express": "^4.14.0",
"jwt-simple": "^0.5.0",
"lodash": "^4.16.4",
"mongoose": "^4.6.4",
"nodemon": "^1.11.0",
"request": "^2.75.0"
"morgan": "^1.7.0"
"angular": "^1.5.8",
"angular-route": "^1.5.8",
"angular-ui-router": "^0.3.1",
"angular-chart": "^0.5.0"
```
## Development


### Installing Dependencies and Starting App
```
From within the root directory:

sudo npm install -g bower
npm install
bower install
npm start     //to start server

visit http://localhost:8008/ on your browser for the landing page
```

### Roadmap
```
> NeighborGoog uses many API's as well as one we made for Crime Score.

> google geolocation            path /api/geoLocation            (param = address string)
> google places restaurants     path /api/restaurantLocation     (param = lat,lng)
> google places stores          path /api/storeLocation          (param = lat,lng)
> google directions             path /api/directions             (param = {originLat: originLat, originLng: originLng, destinationLat: destinationLat, destinationLng: destinationLng})
> NeighborGood score            path /api/score                  (param = {user object with most/all information about destinations and addresses})

> Crime rates are estimated using [California crime data for 2015](https://data.lacity.org/A-Safe-City/Crimes-2012-2015/s9rj-h3s6) and population densities obtained via the [Data Science Toolkit coordinates to statistics API](http://www.datasciencetoolkit.org/coordinates2statistics).
```
