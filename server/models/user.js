// import { ManagementClient } from 'auth0';
const mongoose = require('mongoose');// import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    auth0sub: {
        type: String,
    },
    gradYear: {
        type: Number,
    },
    firstName: {
        type: String
    },
    guestUser: {
        type: Boolean,
        required: true
    },
    lastName: {
        type: String
    },
    jewishness: {
        type: String,
        enum: ['Yes', 'No', 'Complicated']
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

// const auth0 = new ManagementClient({
//     domain: process.env.REACT_APP_AUTH0_DOMAIN,
//     clientId: process.env.REACT_APP_AUTH0_CLIENTID,
//     clientSecret: process.env.CLIENT_SECRET
// });

if (userSchema.auth0sub) {
    // const user = await auth0.getUser({id: auth0sub});
    // const userMetadata = user.user_metadata;
    // console.log(userMetadata);
    
    // userSchema.virtual('firstName').get(() => userMetadata.firstName);
    // userSchema.virtual('lastName').get(() => userMetadata.lastName);
    // userSchema.virtual('jewishness').get(() => userMetadata.jewishness);
    // userSchema.virtual('gradYear').get(() => userMetadata.gradYear);
    // userSchema.virtual('fullName').get(() => `${userMetadata.firstName} ${userMetadata.lastName}`);
} else {
    userSchema.virtual('fullName').get(() => `${firstName} ${lastName}`);
}

module.exports = mongoose.model('User', userSchema);