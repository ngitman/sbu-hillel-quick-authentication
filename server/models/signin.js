const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signInSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        red: "User",
        required: true
    },
    on: {
        type: Date,
        required: True
    }
});

module.exports = mongoose.model('SignIn', signInSchema);