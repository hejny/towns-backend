var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var is = require('../models/services/validation');
var ResourcesModel = require('../models/resources');
var UserModel = require('../models/user');

describe('Resources', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Getting resources balance from API', function () {

        it('should fail when user is not authorised', function (done) {
            request(url)
                .get('/resources')
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should return the resources', function (done) {

            request(url)
                .get('/resources')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('ok');
                    res.body.should.have.property('balance_at');
                    res.body.should.have.property('resources');
                    res.body.resources.should.have.property('clay');
                    res.body.resources.should.have.property('wood');
                    res.body.resources.should.have.property('stone');
                    res.body.resources.should.have.property('iron');
                    done();
                });

        });

        it('should add and return initial resources when user hasn\'t account yet', function (done) {

            UserModel.findOne({"profile.username": "testuser"}, function(err, user) {
                ResourcesModel.remove({owner: user._id}, function (err) {
                    request(url)
                        .get('/resources')
                        .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }

                            res.body.should.have.property('status');
                            res.body.status.should.equal('ok');
                            res.body.should.have.property('balance_at');
                            res.body.should.have.property('resources');
                            res.body.resources.should.have.property('clay');
                            res.body.resources.clay.should.equal(10000);
                            res.body.resources.should.have.property('wood');
                            res.body.resources.wood.should.equal(10000);
                            res.body.resources.should.have.property('stone');
                            res.body.resources.stone.should.equal(10000);
                            res.body.resources.should.have.property('iron');
                            res.body.resources.iron.should.equal(10000);
                            done();
                        });
                });
            });
        });
    });
});