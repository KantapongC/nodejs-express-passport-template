const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
	strict: false,
	toJSON: { virtuals: true }
};

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			index: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		dateCreated: {
			type: Number,
			default: Date.now()
		}
	},
	options
);

module.exports = mongoose.model('User', UserSchema);
