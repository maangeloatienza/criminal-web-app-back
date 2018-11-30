const   JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt  = require('passport-jwt').ExtractJwt,
        //passport    = require('passport'),
        mysql       = require('anytv-node-mysql');
                      require('./../config/config')


module.exports = (passport)=>{
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
    opts.secretOrKey = SECRET_KEY;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // User.findOne({id: jwt_payload.sub}, function(err, user) {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });
        function start(){
            mysql.use('master')
                .query('SELECT * from users where id = ?',
                jwt_payload.sub,
                send_response
                )
                .end();
        }

        function send_response(err,result,args,last_query){
            console.log(result);
            if (err) {
                return done(err, false);
            }
            if (result) {
                return done(null, result);
            } else {
                return done(null, false);
            }
        }

        start();
    }));
}