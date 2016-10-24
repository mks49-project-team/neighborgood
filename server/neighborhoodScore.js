var crime = require('../crimeData/crimeStats.js');
var _ = require('lodash');

var getCommuteScore = function(time){
  // time in minutes
  // scoring method:
  // range from 0 (worst) to 100 (best)
  // commute < 20 min --> 100
  // commute > 120 min --> 0
  if(time > 120) {
    return 0;
  }
  return time < 20 ? 100 : Math.round(100 - (time - 20));
}

var getWalkabilityScore = function(restaurants, stores){
  // scoring method:
  // range from 0 (worst) to 100 (best)
  // stores/restaurants = 0 --> 0
  // stores/restaurants >= 20 --> 100
  var total = restaurants + stores;
  return total > 20 ? 100 : Math.round(100 - (20 - total) * 5);
}

var getScoreWeighting = function(priorities){
  // calculate weighting (as fraction) to apply to each category based on ranking
  var sum = _.reduce(priorities, function(tot, value, key) {
    return tot + value;
  });

  var max = _.reduce(priorities, function(max, x){ // max rating
    if (x > max) {
      return x;
    }
    return max;
  });

  var weights = {};
  _.each(priorities, function(value, key){
    if(value === 0) { // ignore categories marked unimportant
      weights[key] = 0;
    } else {
      // priorities are originally ranked such that lower number represents greater importance
      // need to reverse ranking to obtain a proportion
      weights[key] = (max - value + 1) / sum;
    }
  });
  return weights;
};

var calcTotalScore = function(weights, scores){
  // calculate total score by weighting each category
  var total = 0;
  _.each(weights, function(weight, category){
    if(scores[category]){
      total += weight * scores[category];
    }
  });
  return Math.round(total);
}

var getScores = function(req, res){
  // for testing ******
  // var priorities = {walkability: 2, crime: 3, commute: 1};
  //
  // var userData = {};
  // userData.nearbyRestaurants = new Array(20);
  // userData.nearbyStores = new Array(6);
  // userData.commute.duration.value = 3600;

  var userData = JSON.parse(req.query.userData);
  var priorities = userData.priorities;
  var geolocation = {
    latitude: userData.newAddress.lat,
    longitude: userData.newAddress.lng
  };
  var scoreWeights = getScoreWeighting(priorities);

  var scores = {};

  if (priorities.commute) {
    var time = userData.commute.duration.value / 60; // convert to minutes
    console.log('80 time: ', time);
    scores.commute = getCommuteScore(time);
  }
  if (priorities.walkability) {
    scores.walkability = getWalkabilityScore(userData.numRestaurants, userData.numStores);
  }
  if (priorities.safety) {
    crime.getCrimeScore(req)
      .then(function(safetyScore){
        scores.safety = safetyScore;
        scores.total = calcTotalScore(scoreWeights, scores);
        res.json(scores);
      })
      .catch(function(err){
        res.send(err);
      });
  } else {
    scores.total = calcTotalScore(scoreWeights, scores);
    res.json(scores);
  }

}


module.exports = {
  getScores: getScores,
}
