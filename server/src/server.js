const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

//database
const MONGO_URL = 'mongodb+srv://abc:abc@nasa.uwbgh2g.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa';

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

    server.listen(5000, () => {
        console.log("Listening to port 5000");
    });
}

startServer();
