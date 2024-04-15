const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    server.listen(5000, () => {
        console.log("Listening to port 5000");
    });
}

startServer();
