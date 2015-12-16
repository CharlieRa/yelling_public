/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/notifications              ->  index
 */

'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');

// Gets a list of Notifications
exports.index = function(req, res) {

	console.log('[Notification] - buscando notifiaciones para ', req.params);
  Notification
    .find({
    	"toAuthor": req.params.id
    })
    .populate('fromAuthor')
    .exec(function(err,notifications){
      // console.log('Retornando', commentPopulated);

      return res.status(200).json(notifications);
    });
};

