const express = require('express');
const {
    httpAddNewLaunch,
    httpGetAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();
launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);

module.exports = launchesRouter;