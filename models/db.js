var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
if( process.env.NODE_ENV === 'test') {
   var mongo = require('../config/mLab').mongoDb;
} else {
   var mongo = require('../config/mongo').mongoDb;
}

try
{
   mongoose.connect(mongo.protocol+'//'+mongo.username+':'+mongo.password+'@'+mongo.host+':'+mongo.port+'/'+mongo.db, function() {
      console.log('mongodb connected');
      console.log();
   });
} catch(e)
{
   console.log(e);
}

module.exports = mongoose;