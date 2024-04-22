const launchesDatabase = require('./launches.mongo');

const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Space exploration",
    rocket: "Explorer IS1",
    launchDate: new Date('December 15, 2077'),
    target: "Kepler-442 b",
    customers: [
        "NASA", "LIM"
    ],
    upcoming: true,
    success: true,

};

saveLaunches(launch);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function saveLaunches(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}
async function getAllLaunches() {
    return await launchesDatabase.find({}, { '_id': 0, '__v': 0 });
}


async function scheduleNewLaunch(launch) {
    const newFlightNumber = latestFlightNumber++;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunches(newLaunch);
}

async function abortLaunchById(launchid) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchid,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    scheduleNewLaunch,
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
};