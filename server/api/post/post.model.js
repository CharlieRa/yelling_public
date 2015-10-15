'use strict';

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;
var thinky = require('../thinky.js');
var type = thinky.type;
var r = thinky.r;

/* 	Tabla Post
*		Post pertenece a Usuario
*
*/ 
var Post = thinky.createModel("Post", {
  id: type.string(),
  title: type.string(),
  content: type.string(),
  userId: type.string(),
  votes: type.number().default(0),
  dateTime: type.date().default(r.now)
}); 

// var Author = thinky.createModel("Author", {
//     id: type.string(),
//     name: type.string()
// });
	
// // Join the models
// Post.belongsTo(Author, "author", "idAuthor", "id");
module.exports = Post;

var User = require('../user/user.model');
var Geo = require('../geo/geo.model');
// module.exports = mongoose.model('Thing', ThingSchema);
Post.hasOne(Geo, "geo", "id", "postId");
Post.belongsTo(User, "user", "userId", "id");
