const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const fs = require('fs');
// const path = require('path');
const req = require('request');

const { PUBLIC_KEY } = process.env;
const authServiceRoute = 'http://localhost:5001/token/verify';
// const filePath = path.join(__dirname, '../keys/public.pem');
// const publicEKey = fs.readFileSync(filePath);

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY
};

module.exports = new JWTStrategy(options, async (jwt_payload, done) => {
  try {
    req.post(authServiceRoute, { username: jwt_payload.sub });

    if (verified) {
      done(null, verified);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
