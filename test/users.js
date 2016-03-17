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

    describe('Getting all users from API', function () {

        it('should return a list of users', function (done) {
            request(url)
                .get('/users')
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    for (var each in res.body) {
                        res.body[each].should.have.property('profile');
                        res.body[each].profile.should.not.equal(null);
                        res.body[each].profile.should.have.property('username');
                        res.body[each].should.have.property('start_time');
                        res.body[each].should.have.property('version');
                        res.body[each].should.have.property('contacts');
                        res.body[each].should.have.property('user_roles');

                        res.body[each].should.not.have.property('stop_time');
                        res.body[each].should.not.have.property('_current_id');
                    }
                    done();
                });
        });

    });

    describe('Getting /users/me from API', function () {

        it('should return unauthorized without authorization token', function (done) {

            request(url)
                .get('/users/me')
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should return my profile when token is present', function (done) {

            request(url)
                .get('/users/me')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('profile');
                    res.body.profile.should.not.equal(null);
                    res.body.profile.should.have.property('username');
                    res.body.profile.username.should.equal('testuser');
                    res.body.should.have.property('language');
                    res.body.language.should.equal('cs');
                    res.body.should.have.property('user_roles');
                    res.body.should.have.property('contacts');

                    done();
                });

        });

    });
});