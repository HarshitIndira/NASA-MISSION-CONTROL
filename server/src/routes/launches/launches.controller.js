// const {
//     getAllLaunches,
//     addNewLaunch,
// } = require('../../models/launches.models');

// function httpGetAllLaunches(req, resp) {
//     return resp.status(200).json(getAllLaunches);
// }

// function httpAddNewLaunch(req, resp) {
//     const launch = req.body;
//     launch.launchDate = new Date(launch.launchDate);

//     addNewLaunch(launch);
//     return resp.status(201).json(launch);
// }

// module.exports = {
//     httpAddNewLaunch,
//     httpGetAllLaunches,
// }

const { getAllLaunches, addNewLaunch } = require('../../models/launches.models');

function httpGetAllLaunches(req, resp) {
    const launches = getAllLaunches(); // Call the function to get the array of launches
    return resp.status(200).json(launches); // Return the launches array as JSON
}

function httpAddNewLaunch(req, resp) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    addNewLaunch(launch);
    return resp.status(201).json(launch);
}

module.exports = {
    httpAddNewLaunch,
    httpGetAllLaunches,
};
