#! /usr/bin/env node

var backup = require('mongodb-backup');
var db = require('./../../config/db').mongoDb;

var now = new Date();
var credentials = (db.username !== "" && db.password !== "") ? db.username + ':' + db.password : "";
var uri = db.protocol + '//' + credentials + '@' + db.host + ':' + db.port + '/' + db.db;

console.log("Creating DB backup ...");

backup({
    'uri':  uri,
    'root': __dirname,
    'tar': './db-' + now.getFullYear() + ('0' + (1+now.getMonth())).slice(-2) + ("0" + now.getDate()).slice(-2) + '-' + now.getHours() + now.getMinutes() + '.tar',
    'callback': function(){
        console.log("Backup successfully done");
    }
});
