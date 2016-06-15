'use strict';

var app = require('../..');
import request from 'supertest';

var newRemote;

describe('Remote API:', function() {

  describe('GET /api/remotes', function() {
    var remotes;

    beforeEach(function(done) {
      request(app)
        .get('/api/remotes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          remotes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(remotes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/remotes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/remotes')
        .send({
          name: 'New Remote',
          info: 'This is the brand new remote!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRemote = res.body;
          done();
        });
    });

    it('should respond with the newly created remote', function() {
      expect(newRemote.name).to.equal('New Remote');
      expect(newRemote.info).to.equal('This is the brand new remote!!!');
    });

  });

  describe('GET /api/remotes/:id', function() {
    var remote;

    beforeEach(function(done) {
      request(app)
        .get('/api/remotes/' + newRemote._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          remote = res.body;
          done();
        });
    });

    afterEach(function() {
      remote = {};
    });

    it('should respond with the requested remote', function() {
      expect(remote.name).to.equal('New Remote');
      expect(remote.info).to.equal('This is the brand new remote!!!');
    });

  });

  describe('PUT /api/remotes/:id', function() {
    var updatedRemote;

    beforeEach(function(done) {
      request(app)
        .put('/api/remotes/' + newRemote._id)
        .send({
          name: 'Updated Remote',
          info: 'This is the updated remote!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRemote = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRemote = {};
    });

    it('should respond with the updated remote', function() {
      expect(updatedRemote.name).to.equal('Updated Remote');
      expect(updatedRemote.info).to.equal('This is the updated remote!!!');
    });

  });

  describe('DELETE /api/remotes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/remotes/' + newRemote._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when remote does not exist', function(done) {
      request(app)
        .delete('/api/remotes/' + newRemote._id)
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
