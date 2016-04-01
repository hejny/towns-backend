require('dotenv').config();

var db = {
    "mongoDb": {
        "protocol": "mongodb:",
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "host": process.env.DB_HOST,
        "db": process.env.DB_NAME,
        "port": process.env.DB_PORT
    }
};

module.exports = db;