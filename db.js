var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/towns', function() {
   console.log('mongodb connected');
});
module.exports = mongoose;