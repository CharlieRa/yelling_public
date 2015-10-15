var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, Errors, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'birthday', 'email', 'first_name', 'gender', 'last_name']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('[FB] Profile:' ,profile);
      User.filter({
        id : profile.id
      }).then(function (err, user){
        console.log('[Passport] Encontre facebook user id, logeando con', user);
        // console.log('[Passport] err = ',err);
        
        return done(user);
      }).catch(Errors.DocumentNotFound, function(err){
        console.log('[Passport] No encontre ese facebook user id, creando en BD');
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });
          user.save().then(function(user) {
            console.log('[Passport] Creado usuario facebook :', user);
            // if (err) return done(err);
            done(user);
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
