# NeighborGood

>NeighborGood helps you find a neighborhood thats suitable for your needs in California. This app provides a score for a potential neighborhood based on user selected criteria.

>This app was built with Angular 1.5, Node.js, Express.js, MongoDB/Mongoose and Bootstrap. The following APIs were utilized: Google Maps/Places API, Google geocoding API, Data Science Toolkit API, LA City Open Data API

![alt tag](/../screenshots/neighborgood.gif)

https://neighborgood-demo.herokuapp.com

## Team

  - __Product Owner__: Sergey Sarkisyan
  - __Scrum Master__: Lucy Ji
  - __Development Team Members__: Jeffrey Yoo

## Usage

> 1. Navigate to landing page or click  on "new search"
> 2. Enter a California address
> 3. Select the criteria that are important (current options are walkability, safety and commute time). Enter a commute address if checked.
> 4. Get your neighborhood score
> 5. Sign up or sign in to be able to save and compare search results

## Development

### Installing Dependencies and Starting App

Clone this repository
```
$ git clone https://github.com/mks49-project-team/neighborgood

```
From within the root directory install dependencies (node and bower are required):
```
$ npm install
$ bower install
```
Start server
```
$ npm start
```
Visit http://localhost:8008/ in your browser

### Roadmap

> Server endpoints:
```
> google geolocation            path /api/geoLocation            (param = address string)
> google places restaurants     path /api/restaurantLocation     (param = lat,lng)
> google places stores          path /api/storeLocation          (param = lat,lng)
> google directions             path /api/directions             (param = {originLat: originLat, originLng: originLng, destinationLat: destinationLat, destinationLng: destinationLng})
> NeighborGood score            path /api/score                  (param = {user object with most/all information about destinations and addresses})
```
> Crime rates are estimated using [California crime data for 2015](https://data.lacity.org/A-Safe-City/Crimes-2012-2015/s9rj-h3s6) and population densities obtained via the [Data Science Toolkit coordinates to statistics API](http://www.datasciencetoolkit.org/coordinates2statistics).


### Additional Features to add
```
> OPTIONS PAGE: 
>   Save/cache previously searched addresses for a given user to streamline search
>   Allow user to rank criteria on the client side (algorithm on server endpoint is already set up to handle ranking)
>   Add more API information:
>     Get house information on the area (zillow)
>     Get school zone, school rating, school information
>     Use Yelp to show some events in the area, show how much movement there is in an area
>     Use an Rent api to see if you could rent something in the area
> SAVED RESULTS PAGE:
>  Be able to filter through saved results

```
