var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var UserModel = require('../models/user');

describe('Users', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Creation of new user', function () {
        this.timeout(15000);

        it('should fail when username is missing', function (done) {
            var json = {
                'profile': {
                    'username': ''
                },
                'login_methods': {
                    'password': 'password'
                }
            };

            request(url)
                .post('/users')
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
                    res.body.message[0].param.should.equal('profile.username');
                    res.body.message[0].msg.should.equal('required');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should fail when user with same username is already registered', function (done) {
            var json = {
                'profile': {
                    'username': 'testuser'
                },
                'login_methods': {
                    'password': 'password'
                }
            };

            request(url)
                .post('/users')
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
                    res.body.message[0].param.should.equal('profile.username');
                    res.body.message[0].msg.should.equal('taken');
                    res.body.message[0].val.should.equal('testuser');
                    done();
                });
        });

        it('should fail when username is too long', function (done) {
            var json = {
                'profile': {
                    'username': '1234567890123456789012345678901234567890123456789012345678901234567890'
                },
                'login_methods': {
                    'password': 'password'
                }
            };

            request(url)
                .post('/users')
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
                    res.body.message[0].msg.should.equal('user defined');
                    res.body.message[0].val.should.equal('1234567890123456789012345678901234567890123456789012345678901234567890');
                    done();
                });
        });

        it('should fail when password is missing', function (done) {
            var json = {
                'profile': {
                    'username': 'myusername'
                },
                'login_methods': {
                    'password': ""
                }
            };

            request(url)
                .post('/users')
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
                    res.body.message[0].param.should.equal('login_methods.password');
                    res.body.message[0].msg.should.equal('required');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should fail when language is not valid', function (done) {
            var requestJson = {
                'profile': {
                    'username': 'myusernamesss'
                },
                'login_methods': {
                    'password': "password"
                },
                'language': 'ru'
            };

            request(url)
                .post('/users')
                .send(requestJson)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.message[0].param.should.equal('language');
                    res.body.message[0].msg.should.equal('not allowed value');
                    res.body.message[0].val.should.equal('ru');
                    done();
                });

        });

        it('should fail when language is not ISO-3166 formated', function (done) {
            var requestJson = {
                'profile': {
                    'username': 'myusernamesss'
                },
                'login_methods': {
                    'password': "password"
                },
                'language': 'slovensky'
            };

            request(url)
                .post('/users')
                .send(requestJson)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.message[0].param.should.equal('language');
                    res.body.message[0].msg.should.equal('length');
                    res.body.message[0].val.should.equal('slovensky');
                    done();
                });
        });

        it('should fail when language is not one of the allowed type', function (done) {


             //currently we support only czech and english language. bg stands for bulgaria
             //it should fail while we don't support that language

            var requestJson = {
                'profile': {
                    'username': 'myusernamesss'
                },
                'login_methods': {
                    'password': "password"
                },
                'language': 'bg'
            };

            request(url)
                .post('/users')
                .send(requestJson)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('error');
                    res.body.message[0].param.should.equal('language');
                    res.body.message[0].msg.should.equal('not allowed value');
                    res.body.message[0].val.should.equal('bg');
                    done();
                });

        });

        it('should create user successfully', function (done) {
            var json = {
                'profile': {
                    'username': 'testtest123321testtest123321'
                },
                'login_methods': {
                    'password': "password"
                }
            };
            request(url)
                .post('/users')
                .send(json)
                .expect('Content-Type', /json/)
                .expect(201) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Should.js fluent syntax applied
                    res.body.should.have.property('status');
                    res.body.status.should.not.equal(null);
                    res.body.status.should.equal('ok');
                    res.body.should.have.property('userId');


                    //find the object and check its values
                    UserModel.findOne({_id: res.body.userId}, function (err, saved) {
                        if (err) {
                            throw err;
                        }

                        if (saved.profile.username != json.profile.username) {
                            throw new Error("Saved user is different than the one sent to API");
                        }

                        // remove mocked object
                        saved.remove(function (err) {
                            if (err) {
                                throw err;
                            }

                            done();
                        });

                    });

                });

        });
    });

});