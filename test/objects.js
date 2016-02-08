var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/server').server;


describe('Routing', function () {

    this.timeout(15000);
    var url = config.protocol+'//'+config.hostname+(config.port ? ':'+config.port : '');

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Object', function () {
        this.timeout(15000);

        //it('should correctly update an existing account', function (done) {
        //    var body = {
        //        firstName: 'JP',
        //        lastName: 'Berd'
        //    };
        //    request(url)
        //        .post('/api/profiles/vgheri')
        //        .send(body)
        //        .expect('Content-Type', /json/)
        //        .expect(200) //Status code
        //        .end(function (err, res) {
        //            if (err) {
        //                throw err;
        //            }
        //            // Should.js fluent syntax applied
        //            res.body.should.have.property('_id');
        //            res.body.firstName.should.equal('JP');
        //            res.body.lastName.should.equal('Berd');
        //            res.body.creationDate.should.not.equal(null);
        //            done();
        //        });
        //});
    });


});