'use strict';

var app = require('../..');
import request from 'supertest';

var newWeather;

describe('Weather API:', function () {

  describe('GET /y/:start/:end', function () {
    var weathers;
    var startDate;
    var endDate;

    beforeEach(function (done) {
      request(app)
        .get('/y/' + startDate + '/' + endDate);
      .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          weathers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      expect(weathers).to.be.instanceOf(Array);
    });

  });

  describe('POST /y', function () {
    beforeEach(function (done) {
      request(app)
        .post('/y')
        .send({
          name: 'New Weather',
          info: 'This is the brand new weather!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWeather = res.body;
          done();
        });
    });

    it('should respond with the newly created weather', function () {
      expect(newWeather.name).to.equal('New Weather');
      expect(newWeather.info).to.equal('This is the brand new weather!!!');
    });

  });

  describe('GET /y/:id', function () {
    var weather;

    beforeEach(function (done) {
      request(app)
        .get('/y/' + newWeather._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          weather = res.body;
          done();
        });
    });

    afterEach(function () {
      weather = {};
    });

    it('should respond with the requested weather', function () {
      expect(weather.name).to.equal('New Weather');
      expect(weather.info).to.equal('This is the brand new weather!!!');
    });

  });

  describe('PUT /y/:id', function () {
    var updatedWeather;

    beforeEach(function (done) {
      request(app)
        .put('/y/' + newWeather._id)
        .send({
          name: 'Updated Weather',
          info: 'This is the updated weather!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          updatedWeather = res.body;
          done();
        });
    });

    afterEach(function () {
      updatedWeather = {};
    });

    it('should respond with the updated weather', function () {
      expect(updatedWeather.name).to.equal('Updated Weather');
      expect(updatedWeather.info).to.equal('This is the updated weather!!!');
    });

  });

  describe('DELETE /y/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      request(app)
        .delete('/y/' + newWeather._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when weather does not exist', function (done) {
      request(app)
        .delete('/y/' + newWeather._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
