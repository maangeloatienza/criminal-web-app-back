const JwtStrategy     = require('passport-jwt').Strategy,
      ExtractJwt      = require('passport-jwt').ExtractJwt;
const mysql           = require('anytv-node-mysql');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
    function start(){
        mysql.use('master')
            .query(`SELECT * FROM users WHERE id = ${jwt_payload.sub}`,
            send_response
            )
            .end();

    }

    function send_response(err,user,args,last_query){
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        } 
        
        return done(null, false);
        
    }

    start();


}));