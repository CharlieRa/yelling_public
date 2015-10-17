'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.isLoggedin(), controller.index);
router.get('/:id', controller.show);
router.post('/',auth.isLoggedin(), controller.create);
router.post('/vote/:id',auth.isLoggedin(), controller.vote);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;