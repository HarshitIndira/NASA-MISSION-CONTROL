const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, resp) {
    return resp.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};