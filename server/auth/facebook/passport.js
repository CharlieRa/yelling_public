var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, Errors, r, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'birthday', 'email', 'first_name', 'gender', 'last_name']
    },
    function(accessToken, refreshToken, profile, done) {
      User.get(profile.id).then(function (user){
        console.log('[Passport] Encontre facebook user id, logeando con', user);
        return done(null, user);
      }).catch(Errors.DocumentNotFound, function(err){
        console.log('[Passport] No encontre ese facebook user id, creando en BD');
        var user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });
          user.save().then(function (user) {
            console.log('[Passport] Creado usuario facebook :', user);
            // if (err) return done(err);
            done(null, user);
          });
      })

      // function(err, user) {
      //   console.log('entrando al function then');
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     user = new User({
      //       name: profile.displayName,
      //       email: profile.emails[0].value,
      //       role: 'user',
      //       username: profile.username,
      //       provider: 'facebook',
      //       facebook: profile._json
      //     });
      //     user.save().then(function(err, user) {
      //       if (err) return done(err);
      //       done(err, user);
      //     });
      //   } else {
      //     return done(err, user);
      //   }
      // })
    }
  ));
};
