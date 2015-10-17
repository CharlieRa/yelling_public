'use strict';

// var mongoose = require('mongoose');
var thinky = require('../api/thinky.js');
var Errors = thinky.Errors;
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  console.log('[AUTH] Is authenthicated');
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      console.log('[Auth.isAuthenticated] agregando usuario a la consulta con req =', req.user);

      User.get(req.user._id).then(function(user) {
        res.json(user.profile);
      }).catch(Errors.DocumentNotFound, function(err){
        console.log('[Auth.isAuthenticated] No encontre ese user id, envio 401');
        return res.status(401).send('Unauthorized');
      });

    }) 
}
/**
 * Consulta si la request esta hecha por alguien logeado al sistema
 * En caso de no retorna 403 returns 403
 */
function isLoggedin() {
  console.log('[AUTH] isLoggedin');
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      console.log('[AUTH] isLoggedin req.user', req);
      if(req.user){
        next();
      }else{
        // return res.status(401).send('Unauthorized');
      }
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  console.log('[AUTH] signToken with', id);
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  console.log('[AUTH] entrando setTokenCookie ', req.user);
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user.facebookid, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.isLoggedin = isLoggedin;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;