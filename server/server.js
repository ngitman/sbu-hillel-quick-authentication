const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const { ManagementClient } = require('auth0');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const User = require('./models/user');
const SignIn = require('./models/signin');

const db = mongoose.connect('mongodb://127.0.0.1:27017/sbu-hillel')
    .then(() => console.log("Successfully connected to SBU Hillel DB"))
    .catch(err => console.log(err));

const management = new ManagementClient({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENTID,
    clientSecret: process.env.CLIENT_SECRET
});

app.get('/', async (req, res) => {
    res.send('SBU Auth Server');
});

const isUserObjectCreated = async obj => {
    // obj = { 'guest': true, 'data': {dataObject?}}
    try {
        if (obj.guest) {
            let guestProfile = await User.findOne({
                "firstName": {$regex: new RegExp(obj.data.firstName, "i")},
                "lastName": {$regex: new RegExp(obj.data.lastName, "i")}
            }).exec();
            return guestProfile ? true : false;
        } else {
            let profile = await User.findOne({'auth0sub': obj.data.id}).exec();
            return profile ? true : false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
    return false;
}

app.post('/signin', async (req, res) => {
    const data = req.body; // Request data from frontend
    let user = await isUserObjectCreated({guest: false, data: {id: data.sub}});
    if (!user) {
        user = await User.create({
            'auth0sub': data.sub,
            'guestUser': false,
            'firstName': data.firstName,
            'lastName': data.lastName,
            'jewishness': data.jewishness,
            'gradYear': data.gradYear
        });
    }
    

});
app.post('/authenticate/guest', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let guestProfile = await isUserObjectCreated({guest: true, data: {firstName: data.firstName, lastName: data.lastName}});
        if (!guestProfile) {
            guestProfile = await User.create({
                'firstName':data.firstName,
                'lastName':data.lastName,
                'guestUser': true,
                'jewishness': data.jewishness === '1' ? 'Yes' : data.jewishness === '0' ? 'No' : "It's Complicated",
                'gradYear': data.gradYear
            })
        }

        const userSignedInAlready = await SignIn.find({
            "user": guestProfile._id,  // Use guestProfile._id to match the user field
            "on": { "$gte": moment.utc().startOf('day').toDate() }  // Ensure using UTC time for comparison
        }).exec();
        //const userAlreadySignedIn = userSignedInAlready.find(u => )

        if (userSignedInAlready.length > 0) return res.status(400).json({message:"User has already signed in", status: 400});

        const newSignIn = await SignIn.create({
            'user': guestProfile,
            'on': Date.now()
        });
        console.log(newSignIn);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

const server = app.listen(8000, () => console.log("Listening on port 8000..."));

process.on("SIGINT", async () => {
    await mongoose.connection.close().then(res => console.log(res))
        .then(res => console.log('Database instance disconnected'));
    server.close(() => console.log('Server closed'));
})