const launchesDatabase = require('./launches.mongo');
const axios = require('axios');

let latestFlightNumber = 100;

const SPACEX_URL = 'https://api.spacexdata.com/v5/launches/query';


async function populateLaunch() {
    const response = await axios.post(SPACEX_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });


    if (response.statusCode != 200) {
        console.log("error in downloading data");
    }

    const launchDocs = response.data.docs;
    for (let launchDoc of launchDocs) {

        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunches(launch);
    }
}

async function loadLaunchData() {

    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: ' FalconSat'
    });

    if (firstLaunch) {
        console.log('Launch data already loaded');
    } else {
        await populateLaunch();
    }
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
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
async function getAllLaunches(skip, limit) {
    return await launchesDatabase
        .find({}, { '_id': 0, '__v': 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
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
    loadLaunchData,
    scheduleNewLaunch,
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
};