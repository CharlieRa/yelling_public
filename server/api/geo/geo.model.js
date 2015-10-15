'use strict';

var thinky = require('../thinky.js');
var type = thinky.type;


/* 	Tabla 'geo'
*		Descripcion:
*		Geo pertenece a Post
* 	Post pertenece a User
*/ 
var Geo = thinky.createModel("Geo", {
    id: type.string(),
    location: type.point(), // Objeto punto de R -> r.point(longitude, latitude)
    postId: type.string()
});

module.exports = Geo;

var Post = require('../post/post.model');
Geo.belongsTo(Post, "post", "postId", "id");

