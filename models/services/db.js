var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mongo;
if( process.env.NODE_ENV == 'test') {
    mongo = require('../../config/mLab').mongoDb;
} else {
   mongo = require('../../config/mongo').mongoDb;
}
var credentials = (mongo.username !== "" && mongo.password !== "")? mongo.username+':'+mongo.password : "";
try
{
   mongoose.connect(mongo.protocol+'//'+credentials+'@'+mongo.host+':'+mongo.port+'/'+mongo.db, function() {
      console.log("Connected to mongoDB @ "+mongo.host);
      //console.log(mongo);
   });
} catch(e)
{
   console.log(e);
}

module.exports = mongoose;