const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Space exploration",
    rocket: "Explorer IS1",
    launchDate: new Date('December 15, 2077'),
    target: "Kepler-442 b",
    customer: [
        "NASA", "LIM"
    ],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    console.log(launch)
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: latestFlightNumber,
    }));
}

module.exports = {
    addNewLaunch,
    getAllLaunches,
};