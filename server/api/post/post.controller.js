/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /posts              ->  index
 * POST    /posts              ->  create
 * GET     /posts/:id          ->  show
 * PUT     /posts/:id          ->  update
 * DELETE  /posts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

// busca post cercanos a la ubicacion del usuario solicitante
// radio = 1 km
exports.nearest = function (req, res){
  // Limite de resultados 
  var limit = 10;
  // Distancia de puntos cercanos ~default 1 km
  var distanciaRadio = 2;
  // se calcula el radian con el ansssho de la tierra (radio)
  distanciaRadio /=6371;
  console.log('Distancia radio', distanciaRadio);
  // Saco localizacion ~ primero longitud (!)
  var coords = [];
  coords[0] = req.body.longitude;
  coords[1] = req.body.latitude;


  console.log('Buscando Post cercanos segun localizacion');
  Post.geoNear({
    type: "Point",
    coordinates : coords
    },{
      spherical: true, 
      maxDistance: 800
    }
  ).then(function(posts) {
    return res.status(200).json(posts);
  })
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(post);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}