var mongoose = require('mongoose');

mongoose.connect('mongodb://jeffyoo:password123@ds031877.mlab.com:31877/neighborgood', function(error) {
  if (error) {
    console.log('error in index.js in db:', error)
  } else {
    console.log('mongoose success')
  }
})