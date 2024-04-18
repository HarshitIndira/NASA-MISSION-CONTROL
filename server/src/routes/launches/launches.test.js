const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 sucess', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe('Test POST /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send({
                mission: 'India Space Exploration',
                rocket: 'PSLV 1',
                target: "Kepler-186 f",
                launchDate: 'December 15, 2024',
            })
            .expect('Content-Type', /json/)
            .expect(201)
    });
})