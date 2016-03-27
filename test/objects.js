var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var ObjectModel = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');
var ObjectsHistory = require('../models/objectsHistory');


describe('Objects', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Getting list of objects from API', function () {
        this.timeout(15000);

        it('should return a list of objects', function (done) {

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
                    for (var each in res.body) {
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

        it('should fail when user is not authorised', function (done) {

            
                request(url)
                    .post('/objects')
                    .send({})
                    .expect(401)
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        done();
                    });

        });
        
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
                    .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
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
                    .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
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
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
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
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
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
                    .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
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
                        ObjectModel.findOne({_id: res.body.objectId}, function (err, saved) {
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

        it('should fail when user is not authorised', function (done) {
            request(url)
                .get('/objects/56f82aca3f9285b667df03ca')
                .send({})
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should return the requested object', function (done) {

            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                createObject = {
                    "_prototypeId": prototype._id,
                    "x": 1.234,
                    "y": 4.321,
                    "name": "Domek",
                    "type": "building"

                };

                var object = new ObjectModel(createObject);
                object.save(function (err, newObject) {
                    if (err) {
                        throw err;
                    }
                    //console.log(newObject);
                    // get it through api
                    request(url)
                        .get('/objects/' + newObject._id)
                        .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                        .expect('Content-Type', /json/)
                        .expect(200) //Status code
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            console.log();
                            console.log();

                            // Should.js fluent syntax applied
                            res.body.should.have.property('x');
                            res.body.x.should.not.equal(null);
                            res.body.x.should.equal(1.234);
                            res.body.should.have.property('y');
                            res.body.y.should.equal(4.321);
                            res.body.should.have.property('_prototypeId');
                            if (res.body._prototypeId != prototype._id) {
                                throw new Error("Objects prototypeId doesn't equal.");
                            }
                            res.body.should.have.property('owner');

                            // remove prototype
                            newObject.remove({}, function (err, removed_count) {
                                done();
                            });

                        });

                });

            });
        });

        it("should error when the requested object id is not valid", function (done) {

            // get it through api
            request(url)
                .get('/objects/1234567890')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('Problem getting your object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('1234567890');

                    done();
                });


        });

        it("should return error if the requested object doesn't exist", function (done) {
            // get it through api
            request(url)
                .get('/objects/56af958fbb2d04ed141a24a7')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('There is no such object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('56af958fbb2d04ed141a24a7');

                    done();
                });

        });

    });

    describe('Updating One object from API', function () {
        this.timeout(15000);

        it('should fail when user is not authorised', function (done) {
            request(url)
                .post('/objects/56f82aca3f9285b667df03ca')
                .send({})
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it("should error when the requested object id is not valid", function (done) {

            request(url)
                .post('/objects/1234567890')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('Problem getting your object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('1234567890');

                    done();
                });
            
        });

        it("should error when the requested object doesn't exist", function (done) {

            request(url)
                .post('/objects/56af958fbb2d04ed141a24a7')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('There is no such object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('56af958fbb2d04ed141a24a7');

                    done();
                });

        });

        it('should update the requested object', function (done) {

            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                var createNewObject = {
                    "prototypeId": prototype._id,
                    "x": 1.234,
                    "y": 5.432
                };
                request(url)
                    .post('/objects')
                    .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                    .send(createNewObject)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }

                        var objectId = res.body.objectId;
                        ObjectModel.findOne({"_id": objectId}, function (err, newObject) {
                            if (err) {
                                throw err;
                            }

                            // call api to make requested update on object
                            var updatedObjectJson = {
                                "name": "Tank",
                                "x": "2",
                                "y": "3"
                            };
                            request(url)
                                .post('/objects/' + objectId)
                                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                                .send(updatedObjectJson)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function (err, updateResponse) {
                                    if (err) {
                                        throw err;
                                    }

                                    // check that values are correctly updated
                                    updateResponse.body.should.have.property('status');
                                    updateResponse.body.status.should.not.equal(null);
                                    updateResponse.body.should.have.property('objectId');
                                    updateResponse.body.should.have.property('version');
                                    updateResponse.body.version.should.equal(1);
                                    if (updateResponse.body.objectId != newObject._id) {
                                        throw new Error("Id of updated object doesn't match the id of original object");
                                    }

                                    ObjectModel.findOne({"_id": updateResponse.body.objectId}, function(err, updatedObject) {
                                        if (err) {
                                            throw err;
                                        }

                                        if (updatedObject._id != newObject._id && updatedObject.x.valueOf() != 2 && updatedObject.y.valueOf() != 3) {
                                            throw new Error("Updated object is different than sent changes");
                                        }

                                        // check that history of object was saved correctly
                                        ObjectsHistory.findOne({"_currentId": newObject._id, version: 0}, function(err, history) {
                                            if (err) {
                                                throw err;
                                            }

                                            if (history.x.valueOf() != newObject.x.valueOf() && history.y.valueOf() != newObject.y.valueOf() && history.name != newObject.name &&
                                            history.start_time != newObject.start_time) {
                                                throw new Error("History object is different than previous object");
                                            }

                                            // remove mocked object and objectHistory
                                            history.remove();
                                            updatedObject.remove();

                                            done();
                                        });

                                    });

                                });
                        });

                    });

            });

        });

    });

    describe('Deleting One object from API', function () {
        this.timeout(15000);
        
        it('should fail when user is not authorised', function (done) {
            request(url)
                .delete('/objects/56f82aca3f9285b667df03ca')
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
        
        it("should error when the requested object id is not valid", function (done) {

            request(url)
                .delete('/objects/1234567890')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('Problem getting your object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('1234567890');

                    done();
                });
            
        });

        it("should error when the requested object doesn't exist", function (done) {

            // get it through api
            request(url)
                .delete('/objects/56af958fbb2d04ed141a24a7')
                .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                .expect('Content-Type', /json/)
                .expect(400) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.property('status');
                    res.body.status.should.equal('error');
                    res.body.should.have.property('message');
                    res.body.message.should.be.instanceof(Array);
                    res.body.message[0].should.have.property('msg');
                    res.body.message[0].msg.should.equal('There is no such object');
                    res.body.message[0].should.have.property('param');
                    res.body.message[0].param.should.equal('id');
                    res.body.message[0].should.have.property('val');
                    res.body.message[0].val.should.equal('56af958fbb2d04ed141a24a7');

                    done();
                });


        });

        it('should delete the requested object', function (done) {

            // create mocked object
            ObjectsPrototype.findOne({}, function (err, prototype) {
                if (err) {
                    throw err;
                }

                var createNewObject = {
                    "prototypeId": prototype._id,
                    "x": 1.234,
                    "y": 5.432
                };
                request(url)
                    .post('/objects')
                    .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                    .send(createNewObject)
                    .expect('Content-Type', /json/)
                    .expect(201) //Status code
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }

                        var objectId = res.body.objectId;
                        // get it through api
                        request(url)
                            .delete('/objects/' + objectId)
                            .set('x-auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.xyrhj0YRax4aylMdElRXqHh2vIltDIi22-kCgDvZsxU')
                            .expect('Content-Type', /json/)
                            .expect(200) //Status code
                            .end(function (err, res) {
                                if (err) {
                                    throw err;
                                }
                                // Should.js fluent syntax applied
                                res.body.should.have.property('status');
                                res.body.status.should.equal('deleted');
                                res.body.should.have.property('objectId');
                                if (res.body.objectId != objectId) {
                                    throw new Error("Different prototype was deleted");
                                }

                                // delete from objectsHistory
                                ObjectsHistory.findOne({_currentId: objectId}, function (err, history) {
                                    if (err) {
                                        throw err;
                                    }
                                    // remove history of object
                                    history.remove(function (err) {
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


    });
});