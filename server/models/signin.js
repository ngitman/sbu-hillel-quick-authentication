const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signInSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    on: {
        type: Date,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
});

module.exports = mongoose.model('SignIn', signInSchema);