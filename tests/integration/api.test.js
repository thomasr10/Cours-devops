const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/index');
const Task = require('../../src/models/task');

let mongoServer;

beforeAll(async () => {
  // Déconnecte la vraie BDD si connectée
  await mongoose.disconnect();

  // Lance une BDD en mémoire pour les tests
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Nettoie la collection entre chaque test
  await Task.deleteMany({});
});

describe('GET /api/tasks', () => {
  it('retourne un tableau vide si aucune tâche', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('retourne les tâches existantes', async () => {
    await Task.create({ title: 'Tâche 1', description: 'Desc 1' });
    await Task.create({ title: 'Tâche 2', description: 'Desc 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe('Tâche 1');
  });
});

describe('POST /api/tasks', () => {
  it('crée une tâche avec title et description', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Nouvelle tâche', description: 'Ma description' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Nouvelle tâche');
    expect(res.body.description).toBe('Ma description');
    expect(res.body._id).toBeDefined();
  });

  it('échoue si title manquant', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Sans titre' });

    expect(res.status).toBe(400);
  });

  it('échoue si description manquante', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Sans description' });

    expect(res.status).toBe(400);
  });
});

describe('GET /health', () => {
  it('retourne status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});