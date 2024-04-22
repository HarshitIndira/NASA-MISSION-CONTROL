const { getAllLaunches, existsLaunchWithId, abortLaunchById, scheduleNewLaunch } = require('../../models/launches.models');

async function httpGetAllLaunches(req, resp) {
    const launches = await getAllLaunches();// Call the function to get the array of launches
    return resp.status(200).json(launches); // Return the launches array as JSON
}

async function httpAddNewLaunch(req, resp) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    await scheduleNewLaunch(launch);
    return resp.status(201).json(launch);
}


async function httpAbortLaunch(req, resp) {
    const launchId = Number(req.params.id);

    const existsLaunch = await existsLaunchWithId(launchId);

    if (!existsLaunch) {
        return resp.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted"
        })
    } else {

        return resp.status(200).json({
            ok: true,
        });
    }
}

module.exports = {
    httpAddNewLaunch,
    httpGetAllLaunches,
    httpAbortLaunch,
};
