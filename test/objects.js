var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;


describe('Objects', function () {

    this.timeout(15000);
    var url = config.protocol+'//'+config.hostname+(config.port ? ':'+config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Getting objects from API', function () {
        this.timeout(15000);
        // todo

    });

    describe('Creation of new object', function () {
        this.timeout(15000);
        // todo

    });

    describe('Getting of One object from API', function () {
        this.timeout(15000);
        // todo

    });

    describe('Updating One object from API', function() {
        this.timeout(15000);
        // todo

    });

    describe('Deleting One object from API', function() {
        this.timeout(15000);
        // todo

    });
});