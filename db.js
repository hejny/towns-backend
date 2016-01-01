var mongoose = require('mongoose');
var mongo = require('../config/mongo').mongoDb;

try
{
   mongoose.connect('mongodb://'+mongo.host+'/'+mongo.db+':'+mongo.port, function() {
      console.log('mongodb connected');
   });
} catch(e)
{
   console.log(e);
}

module.exports = mongoose;