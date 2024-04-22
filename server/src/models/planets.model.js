const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => { // Reversed the order of resolve and reject in the Promise constructor
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanets(data);
                }
            })
            .on('error', (err) => {
                console.error(err); // Changed console.log to console.error for errors
                reject(err);
            })
            .on('end', async () => {
                // console.log(habitablePlanets.map((planet) => {
                //     return planet['kepler_name'];
                // }));
                const planetCount = (await getAllPlanets()).length;
                console.log(`${planetCount} habitable planets found!`);
                resolve();
            });
    });
}

async function getAllPlanets() {
    return await planets.find({});
}

async function savePlanets(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        },
            {
                keplerName: planet.kepler_name
            }, {
            upsert: true
        }
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};
