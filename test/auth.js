var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;

describe('Authentication', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Requesting authentication token', function () {

        it('should fail when username is missing', function (done) {
            var json = {
                'password': 'password'
            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message[0].param.should.equal('body');
                    res.body.message[0].msg.should.equal('username and password must be present');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should fail when username is empty', function (done) {
            var json = {
                'username': '',
                'password': 'password'

            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message[0].param.should.equal('username');
                    res.body.message[0].msg.should.equal('There is no such user');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it("should fail when user doesn't exist", function (done) {
            var json = {
                'username': 'this username surely doesnt exit or I eat my shoe',
                'password': 'password'

            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message[0].param.should.equal('username');
                    res.body.message[0].msg.should.equal('There is no such user');
                    res.body.message[0].val.should.equal('this username surely doesnt exit or I eat my shoe');
                    done();
                });

        });

        it('should fail when password is missing', function (done) {
            var json = {
                'username': 'testuser'
            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message[0].param.should.equal('body');
                    res.body.message[0].msg.should.equal('username and password must be present');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should fail when password is empty', function (done) {
            var json = {
                'username': 'testuser',
                'password': ''

            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message[0].param.should.equal('password');
                    res.body.message[0].msg.should.equal('The password is not correct for the given user');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should return token successfully', function (done) {
            var json = {
                'username': 'testuser',
                'password': 'password'
            };

            request(url)
                .post('/auth')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('x-auth');
                    res.body["x-auth"].should.not.equal(null);
                    res.body["x-auth"].should.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU');

                    done();

                });

        });

    });
});