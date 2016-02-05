var should = require('should');
var assert = require('assert');
var request = require('supertest');
var check = require('validator');

describe('Routing', function () {

    this.timeout(15000);
    var url = 'http://localhost:3000';

    // within before() you can run all the operations that are needed to setup your tests (eg. create DB connection)
    before(function (done) {
        // do something before done
        done();
    });

    describe('Index', function () {
        this.timeout(15000);

        it('should take less than 500ms', function (done) {
            setTimeout(done, 300);
        });

        it('should respond with 200 status code and HTML homepage', function (done) {
            request(url)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should contain Towns 5 API in title', function (done) {
            request(url)
                .get('/')
                .expect(hasCorrectTitle)
                .end(done);

            function hasCorrectTitle(res) {
                //console.log(res.text);
                if (!check.contains(res.text, "<title>Towns 5 API</title>")) throw new Error("missing correct title in homepage HTML");
            }

        });

        it('should contain Welcome in header', function (done) {
            request(url)
                .get('/')
                .expect(hasWelcomeInHeader)
                .end(done);

            function hasWelcomeInHeader(res) {
                if (!(check.contains(res.text, "welcome"))) throw new Error("missing welcome in homepage HTML");
            }
        });


    });
});