require('dotenv').config();

var server = {

    "server": {
        "protocol": process.env.PROTOCOL,
        "hostname": process.env.HOSTNAME,
        "port": process.env.PORT
    },

    "secretKey": "someultrasup3r5ecreth4shk3yw1thsom354lt"
};

module.exports = server;