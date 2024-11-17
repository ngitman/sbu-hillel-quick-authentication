const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mongoose.connect('mongodb://127.0.0.1:27017/sbu-hillel')
    .then(() => console.log("Successfully connected to SBU Hillel DB"))
    .catch(err => console.log(err));

app.get('/', async (res, req) => {
    res.send('SBU Auth Server');
})

app.post('/signin', async (res, req) => {
    const data = req.body;
    console.log(data);
})

const server = app.listen(8000, () => console.log("Listening on port 8000..."));

process.on("SIGINT", async () => {
    await mongoose.connection.close().then(res => console.log(res))
        .then(res => console.log('Database instance disconnected'));
    server.close(() => console.log('Server closed'));
})