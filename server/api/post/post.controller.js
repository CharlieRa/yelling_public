/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var thinky = require('../thinky.js');
var Errors = thinky.Errors;

// Get list of things
exports.index = function(req, res) {
  // Thing.find(function (err, things) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(things);
  // });
  Post.run().then(function(post) {
    console.log('[Post.controller.index] Encontre :', post);
    return res.json(post);
  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[Post.controller.show] No encontre ningun post , envio 404');
    return res.status(404).send('Not Found');
  });
  
};

// Get a single thing
exports.show = function(req, res) {
  Post.get(req.params.id).then(function(post) {
    return res.json(post);
  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[Post.controller.show] No encontre ese post id, envio 404');
    return res.status(404).send('Not Found');
  });
  // Thing.findById(req.params.id, function (err, thing) {
  //   if(err) { return handleError(res, err); }
  //   if(!thing) { return res.status(404).send('Not Found'); }
  //   return res.json(thing);
  // });
};

exports.vote = function (req, res) {
  Post.get(req.params.id).then(function(post) {
    console.log('[Post.controller.show] Vote UP para post', post.id);
    post.votes = post.votes+1;
    console.log('[Post.controller.show] Guardando vote UP con ', post.votes);
    post.save().then(function(post) {
      return res.status(200);
    });
  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[Post.controller.show] No encontre ese post id, envio 404');
    return res.status(404).send('Not Found');
  });
}

// Creates a new thing in the DB.
exports.create = function(req, res) {
  console.log('Me llego:', req.body);
  Post.save(req.body).then(function (post) {
    return res.status(201).json(post);
  });

};

// Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return handleError(res, err); }
//     if(!thing) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(thing);
//     });
//   });
// };

// // Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Post.get(req.params.id).then(function (post) {
    post.delete().then(function() {
      console.log('[Post.controller.destroy] Post eliminado');
      return res.status(204).send('No Content');
    });

  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[Post.controller.destroy] No encontre ese post id, envio 404');
    return res.status(404).send('Not Found');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}