var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var ObjectModel = require('../database/models/object');
var ObjectsPrototype = require('../database/models/objectsPrototype');
var ObjectsHistory = require('../database/models/objectsHistory');
var UserModel = require('../database/models/user');

describe('Stories', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');
    
    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Getting list of stories from API', function () {

        it('should return a list of objects', function (done) {

            request(url)
                .get('/stories')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.instanceof(Array);
                    for (var each in res.body) {
                        res.body[each].should.have.property('name');
                        res.body[each].name.should.not.equal(null);
                        res.body[each].should.have.property('locale');
                        res.body[each].should.have.property('type');
                        res.body[each].type.should.equal('story');
                        res.body[each].should.have.property('start_time');
                        res.body[each].should.have.property('owner');
                    }

                    done();
                });
        });

        it('should proceed even without authorization token', function (done) {

            request(url)
                .get('/stories')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });


        
    });

    
});