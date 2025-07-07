const request = require('supertest');
const app = require('../app');

describe('GET /servicos', () => {
  test('Deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/servicos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /servicos', () => {
  test('Erro 400 se dados incompletos', async () => {
    const res = await request(app).post('/servicos').send({ preco: 30 });
    expect(res.statusCode).toBe(400);
  });
});
