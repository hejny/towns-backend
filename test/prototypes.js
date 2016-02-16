var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;
var ObjectsPrototype = require('../models/objectsPrototype');


describe('Prototypes', function () {

    this.timeout(15000);
    var url = config.protocol + '//' + config.hostname + (config.port ? ':' + config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Getting prototypes from API', function () {
        this.timeout(15000);

        it('should return a list of prototypes', function (done) {

            request(url)
                .get('/objects/prototypes')
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }


                    //console.log(res.body);
                    for (each in res.body) {
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

    describe('Creation of new prototype', function () {
        this.timeout(15000);

        it('should fail when NAME is missing', function (done) {

            var prototype = {
                "name": "",
                "type": "building",
                "locale": "cs"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('name');
                    res.body.message[0].value.should.equal('');
                    done();
                });
        });

        it('should fail when NAME is too long', function (done) {
            var prototype = {
                "name": "12345678901234567890123456789012345678901234567890123456789012345",
                "type": "building"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('name');
                    res.body.message[0].msg.should.equal('maxlength');
                    res.body.message[0].value.should.equal('12345678901234567890123456789012345678901234567890123456789012345');
                    done();
                });
        });

        it('should fail when TYPE is missing', function (done) {
            var prototype = {
                "name": "Ambasada"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('type');
                    res.body.message[0].msg.should.equal('required');
                    res.body.message[0].value.should.equal('');
                    done();
                });
        });

        it('should fail when TYPE is not the allowed one', function (done) {
            var prototype = {
                "name": "Ambasada",
                "type": "supertype"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('type');
                    res.body.message[0].msg.should.equal('user defined');
                    res.body.message[0].value.should.equal('supertype');
                    done();
                });
        });

        it('should fail when LOCALE is 3 or more characters', function (done) {
            var prototype = {
                "name": "Ambasada",
                type: "building",
                "locale": "css"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('locale');
                    res.body.message[0].msg.should.equal('length');
                    res.body.message[0].value.should.equal('css');
                    done();
                });
        });

        it('should fail when LOCALE is not alphabetic', function (done) {

            var prototype = {
                "name": "Ambasada",
                "type": "building",
                "locale": "12"
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.message[0].param.should.equal('locale');
                    res.body.message[0].value.should.equal('12');
                    done();
                });
        });

        it('should create prototype successfully', function (done) {

            var prototype = {
                "name": "Brana",
                "type": "building",
                "locale": "cs",
                "newproperty": "something hacky",
                "other": "asdasda",
                "design": {
                    "type": "model",
                    "data": "54,32,11,..."
                },
                "content": {
                    "type": "markdown",
                    "data": "Brana je cast ochrannej steny"
                },
                "properties": {
                    "strength": 3,
                    "defense": 7,
                    "speed": 1
                },
                "actions": [
                    "attack",
                    "defense",
                    "dismantle"
                ]
            };

            request(url)
                .post('/objects/prototypes')
                .send(prototype)
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
                    res.body.should.have.property('prototypeId');


                    //find the prototype and check its values
                    //console.log(res.body.prototypeId);
                    ObjectsPrototype.findOne({_id: res.body.prototypeId}, function (err, prototype) {
                        if (err) {
                            throw err;
                        }
                        // remove mocked prototype
                        prototype.remove(function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    });

                    //console.log(ObjectsPrototype);
                    //if( (typeof(ObjectsPrototype.newproperty) != 'undefined') ||
                    //    (typeof(ObjectsPrototype.other) != 'undefined') ) {
                    //    throw new Error("Not declared properties shouldn't save in DB");
                    //}
                    //
                    //if((ObjectsPrototype.locale != 'cs') ) {
                    //    throw new Error("Locale should equal to cs");
                    //}


                    done();
                });
        });

    });

    describe('Getting of One prototype from API', function () {
        this.timeout(15000);

        it('should return the prototype', function (done) {
            // create prototype
            newPrototype = {
                "name": "Ambasada",
                "type": "building",
                "locale": "cs"

            };
            var prototype = new ObjectsPrototype(newPrototype);
            prototype.save(function (err, prototype) {
                if (err) {
                    throw err;
                }

                // get it through api
                request(url)
                    .get('/objects/prototypes/'+prototype._id)
                    .expect('Content-Type', /json/)
                    .expect(200) //Status code
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        // Should.js fluent syntax applied
                        res.body.should.have.property('name');
                        res.body.name.should.not.equal(null);
                        res.body.name.should.equal('Ambasada');
                        res.body.should.have.property('type');
                        res.body.type.should.equal('building');
                        res.body.should.have.property('subtype');
                        res.body.should.have.property('locale');
                        res.body.locale.should.equal('cs');
                        res.body.should.have.property('owner');

                        // remove prototype
                        prototype.remove();

                        done();
                    });

            });
        });
    });

    describe('Updating One prototype from API', function () {
        this.timeout(15000);
        // todo

    });

    describe('Deleting One prototype from API', function () {
        this.timeout(15000);
        // todo

    });

});