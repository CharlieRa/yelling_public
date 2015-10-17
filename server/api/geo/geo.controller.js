'use strict';

var _ = require('lodash');
var Geo = require('./geo.model');

// Get list of geos
exports.index = function(req, res) {
  Geo.find(function (err, geos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(geos);
  });
};

// Get a single geo
exports.show = function(req, res) {
  Geo.findById(req.params.id, function (err, geo) {
    if(err) { return handleError(res, err); }
    if(!geo) { return res.status(404).send('Not Found'); }
    return res.json(geo);
  });
};

// Creates a new geo in the DB.
exports.create = function(req, res) {
  Geo.create(req.body, function(err, geo) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(geo);
  });
};

// Updates an existing geo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Geo.findById(req.params.id, function (err, geo) {
    if (err) { return handleError(res, err); }
    if(!geo) { return res.status(404).send('Not Found'); }
    var updated = _.merge(geo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(geo);
    });
  });
};

// Deletes a geo from the DB.
exports.destroy = function(req, res) {
  Geo.findById(req.params.id, function (err, geo) {
    if(err) { return handleError(res, err); }
    if(!geo) { return res.status(404).send('Not Found'); }
    geo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}