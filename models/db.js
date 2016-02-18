var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mongo = require('../config/mongo').mongoDb;

try
{
   mongoose.connect(mongo.protocol+'//'+mongo.host+':'+mongo.port+'/'+mongo.db, function() {
      console.log('mongodb connected');
   });
} catch(e)
{
   console.log(e);
}

module.exports = mongoose;