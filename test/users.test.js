const request = require('supertest');
const app = require('../app');
const chai = require('chai');

var expect = chai.expect;

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /api', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});