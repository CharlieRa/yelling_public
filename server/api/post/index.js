'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
/* propuesta get con parametros ?key=value
* router.get('/nearest', controller.nearest)
*
*  GET localhost:PORT/nearest?lat=123&long
* req.query.lat 
* req.query.long
*/

router.post('/nearest/:id', controller.nearest);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;