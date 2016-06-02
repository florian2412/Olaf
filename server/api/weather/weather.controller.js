/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 * POST    /y              ->  create
 * GET     /y/:id          ->  show
 * PUT     /y/:id          ->  update
 * DELETE  /y/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Weather from './weather.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Weathers
export function index(req, res) {
  return Weather.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function search(req, res) {
  return Weather.find({
      date: {
        $lte: new Date(parseInt(req.params.start)),
        $gt: new Date(parseInt(req.params.end))
      }
    }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
