var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function () {

    var url = 'http://localhost:3000';

    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        // do something before done
        done();
    });

    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!

    describe('Index', function () {
        it('should respond with HTML homepage', function (done) {
            request(url)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    if (!('Towns' in res.body)) return "missing title";
                    done();
                });
        });
    });

    //describe('Object', function () {
    //    it('should correctly update an existing account', function (done) {
    //        var body = {
    //            firstName: 'JP',
    //            lastName: 'Berd'
    //        };
    //        request(url)
    //            .post('/api/profiles/vgheri')
    //            .send(body)
    //            .expect('Content-Type', /json/)
    //            .expect(200) //Status code
    //            .end(function (err, res) {
    //                if (err) {
    //                    throw err;
    //                }
    //                // Should.js fluent syntax applied
    //                res.body.should.have.property('_id');
    //                res.body.firstName.should.equal('JP');
    //                res.body.lastName.should.equal('Berd');
    //                res.body.creationDate.should.not.equal(null);
    //                done();
    //            });
    //    });
    //});


});