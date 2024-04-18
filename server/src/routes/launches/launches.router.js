const express = require('express');
const {
    httpAddNewLaunch,
    httpGetAllLaunches,
    httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();
launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);
launchesRouter.delete('/launches/:id', httpAbortLaunch);

module.exports = launchesRouter;