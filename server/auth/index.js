'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');
var thinky = require('../api/thinky.js');
var r = thinky.r;
var Errors = thinky.Errors;

// Passport Configuration
require('./local/passport').setup(User, Errors, r, config);
require('./facebook/passport').setup(User, Errors, r, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

module.exports = router;