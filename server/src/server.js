const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.models')

//database
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongodb connection ready !!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(5000, () => {
        console.log("Listening to port 5000");
    });
}

startServer();
