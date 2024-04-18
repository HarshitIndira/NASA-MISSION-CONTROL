const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.models');

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


function httpAbortLaunch(req, resp) {
    const launchId = Number(req.params.id);
    // console.log('qwerty ======>', launchId)
    if (!existsLaunchWithId(launchId)) {
        return resp.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = abortLaunchById(launchId);
    return resp.status(200).json(aborted);
}

module.exports = {
    httpAddNewLaunch,
    httpGetAllLaunches,
    httpAbortLaunch,
};
