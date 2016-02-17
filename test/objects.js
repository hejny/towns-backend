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

        it('should return a list of prototypes', function (done) {

            request(url)
                .get('/objects')
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.instanceof(Array);


                    console.log(res.body);
                    for (each in res.body) {
                        //console.log(each);
                        res.body[each].should.have.property('name');
                        res.body[each].name.should.not.equal(null);
                        res.body[each].should.have.property('locale');
                        res.body[each].should.have.property('type');
                        res.body[each].should.not.have.property('x');
                        res.body[each].should.not.have.property('y');
                        res.body[each].should.not.have.property('start_time');
                    }

                    done();
                });
        });

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