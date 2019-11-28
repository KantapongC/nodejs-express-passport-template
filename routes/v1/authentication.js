const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Auth login
router.get('/login', (req, res) => {
	// handle logging in
});

// Auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	res.send('logging out');
});

router.post('/register', async (req, res, next) => {
	const { username, password, confirmPassword, name } = req.body;

	if (!username && username !== '') return res.status(400).json({ status: 'Failed', message: `Missing field username` });
	if (password !== confirmPassword) return res.status(400).json({ status: 'Failed', message: `Passwords must matched` });

	try {
		const exist = await User.findOne({ username }).countDocuments();

		if (exist) return res.status(400).json({ status: 'Failed', message: 'User already exists' });

		/** Hash password and save it into database */
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ username, password: hashedPassword, name });
		const userCreated = await newUser.save();

		res.json({ status: 'Success', result: userCreated });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
