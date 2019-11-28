const express = require('express');
const router = express.Router();

// Auth login
router.get('/login', (req, res) => {
  // handle logging in
});

// Auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	res.send('logging out');
});

module.exports = router;
