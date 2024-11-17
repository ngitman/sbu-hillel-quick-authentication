const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    auth0sub: {
        type: String,
        requried: true
    },
    gradYear: {
        type: Number,
        required: true
    },
    jewishness: {
        type: String,
        enum: ['Yes', 'No', 'Complicated']
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

userSchema.virtual('fullName').get(() => `${firstName} ${lastName}`);

module.exports = mongoose.model('User', userSchema);