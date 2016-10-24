var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, function(error) {
  if (error) {
    console.log('error in index.js in db:', error);
  } else {
    console.log('mongoose success');
  }
});
