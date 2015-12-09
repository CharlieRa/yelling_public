'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://yelling.cl',
  SESSION_SECRET:   'meanserver-secret2',

  FACEBOOK_ID:      '1676193472610816',
  FACEBOOK_SECRET:  'd18a3c68fbea3b90cd5fae2db3f342b5',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
