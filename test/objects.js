var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var Object = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');


describe('Objects', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

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
                    //console.log(res.body);
                    for (each in res.body) {
                        //console.log(each);
                        res.body[each].should.have.property('name');
                        res.body[each].name.should.not.equal(null);
                        res.body[each].should.have.property('locale');
                        res.body[each].should.have.property('type');
                        res.body[each].should.have.property('x');
                        res.body[each].should.have.property('y');
                        res.body[each].should.have.property('start_time');
                        res.body[each].should.have.property('owner');
                    }

                    done();
                });
        });

    });

    describe('Creation of new object', function () {
        this.timeout(15000);

        it('should fail when X is missing', function (done) {

            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                var object = {
                    'prototypeId': prototype._id,
                    'y': 1.234
                };

                request(url)
                    .post('/objects')
                    .send(object)
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
                        res.body.message[0].param.should.equal('x');
                        res.body.message[0].msg.should.equal('required');
                        done();
                    });
            });


        });

        it('should fail when Y is missing', function (done) {

            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                var object = {
                    'prototypeId': prototype._id,
                    'x': 1.234
                };

                request(url)
                    .post('/objects')
                    .send(object)
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
                        res.body.message[0].param.should.equal('y');
                        res.body.message[0].msg.should.equal('required');
                        done();
                    });
            });


        });

        it('should fail when prototypeId is missing', function (done) {

            var object = {
                'x': 1.234,
                'y': 1.234
            };

            request(url)
                .post('/objects')
                .send(object)
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
                    res.body.message[0].param.should.equal('prototypeId');
                    res.body.message[0].msg.should.equal('There is no such prototype');
                    res.body.message[0].val.should.equal('');
                    done();
                });

        });

        it('should fail when prototypeId is not valid', function (done) {

            var object = {
                'prototypeId': "12345678",
                'x': 1.234,
                'y': 1.234
            };

            request(url)
                .post('/objects')
                .send(object)
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
                    res.body.message[0].param.should.equal('prototypeId');
                    res.body.message[0].msg.should.equal('Problem getting your prototype');
                    res.body.message[0].val.should.equal(object.prototypeId);
                    done();
                });

        });

        it('should create object successfully', function (done) {


            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                var object = {
                    "prototypeId": prototype._id,
                    "x": 1.234,
                    "y": 5.432
                };

                request(url)
                    .post('/objects')
                    .send(object)
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
                        res.body.should.have.property('objectId');


                        //find the object and check its values
                        //console.log(res.body.objectId);
                        Object.findOne({_id: res.body.objectId}, function (err, saved) {
                            if (err) {
                                throw err;
                            }

                            if (saved._prototypeId != prototype._id && saved.x.valueOf() != 1.234 && saved.y.valueOf() != 5.432) {
                                throw new Error("Saved object is different than sent one");
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

    describe('Getting of One object from API', function () {
        this.timeout(15000);

        it('should return the requested object', function (done) {

            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }
                // create object
                newObject = {
                    "_prototypeId": prototype._id,
                    "x": 1.234,
                    "y": 4.321,
                    "name": "Domek",
                    "type": "building"

                };
                console.log(newObject);
                var object = new Object(newObject);
                object.save(function (err, object) {
                    if (err) {
                        console.log(err);

                        throw err;
                    }

                    // get it through api
                    request(url)
                        .get('/objects/' + object._id)
                        .expect('Content-Type', /json/)
                        .expect(200) //Status code
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            // Should.js fluent syntax applied
                            res.body.should.have.property('x');
                            res.body.x.should.not.equal(null);
                            res.body.x.should.equal(1.234);
                            res.body.should.have.property('y');
                            res.body.y.should.equal(4.321);
                            res.body.should.have.property('_prototypeId');
                            res.body._prototypeId.should.equal(prototype._id);
                            res.body.should.have.property('owner');

                            // remove prototype
                            object.remove({}, function(err,removed_count) {
                                done();
                            });

                        });

                });

            });
        });

    });

    describe('Updating One object from API', function () {
        this.timeout(15000);
        // todo

    });

    describe('Deleting One object from API', function () {
        this.timeout(15000);
        // todo

    });
});