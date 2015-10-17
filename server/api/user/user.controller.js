'use strict';
var thinky = require('../thinky.js');
var Errors = thinky.Errors;
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  // User.find({}, '-salt -hashedPassword', function (err, users) {
  //   if(err) return res.status(500).send(err);
  //   res.status(200).json(users);
  // });
};

/**
 * Creates a new user
 */
// exports.create = function (req, res, next) {
//   var newUser = new User(req.body);
//   newUser.provider = 'local';
//   newUser.role = 'user';
//   newUser.save(function(err, user) {
//     if (err) return validationError(res, err);
//     var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
//     res.json({ token: token });
//   });
// };

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.facebookid;
  User.get(userId).then(function(user) {
    if (err) return next(err);
    res.json(user.profile);
  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[User.controller.show] No encontre ese user id, envio 401');
    return res.status(401).send('Unauthorized');
  });
  // User.findById(userId, function (err, user) {
  //   if (err) return next(err);
  //   if (!user) return res.status(401).send('Unauthorized');
    
  // });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  // User.findByIdAndRemove(req.params.id, function(err, user) {
  //   if(err) return res.status(500).send(err);
  //   return res.status(204).send('No Content');
  // });
};

/**
 * Change a users password
 */
// exports.changePassword = function(req, res, next) {
//   var userId = req.user._id;
//   var oldPass = String(req.body.oldPassword);
//   var newPass = String(req.body.newPassword);

//   User.findById(userId, function (err, user) {
//     if(user.authenticate(oldPass)) {
//       user.password = newPass;
//       user.save(function(err) {
//         if (err) return validationError(res, err);
//         res.status(200).send('OK');
//       });
//     } else {
//       res.status(403).send('Forbidden');
//     }
//   });
// };

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.facebookid;
  User.get(userId).then(function(user) {
    console.log('[User.controller.me] Encontre ese user id, envio usuario', user);
    res.json(user);
  }).catch(Errors.DocumentNotFound, function(err){
    console.log('[User.controller.me] No encontre ese user id, envio 401');
    return res.status(401).send('Unauthorized');
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
