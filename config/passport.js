const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy({
        // options for google strategy
    }, () => {
        // passport callback function
    })
);