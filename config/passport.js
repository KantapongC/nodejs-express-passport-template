const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });

			if (!user) return done(null, false);

			const isMatch = await bcrypt.compare(password, user.password);

			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (error) {
			return done(error);
		}
	})
);
