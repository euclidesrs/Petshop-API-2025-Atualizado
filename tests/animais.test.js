const request = require('supertest');
const app = require('../app');

describe('GET /animais', () => {
  test('Deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/animais');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /animais', () => {
  test('Deve retornar erro 400 se dados incompletos', async () => {
    const res = await request(app).post('/animais').send({ nome: 'Rex' });
    expect(res.statusCode).toBe(400);
  });
});