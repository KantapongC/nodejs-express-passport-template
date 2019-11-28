const express = require('express');
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { secret } = require('./config/keys');
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const clusterDB = process.env.ClUSTER_DB_URI;

// Connect to MongoDB Options
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	dbName: 'everAuth',
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

// Connect to MongoDB
mongoose
	.connect(clusterDB, options)
	.then(console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
const auth = require('./routes/v1/authentication');
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server is running on port ${port}`));
