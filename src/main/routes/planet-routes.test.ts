import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('Planet Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const planetCollection = await MongoHelper.getCollection('planets');
    await planetCollection.deleteMany({});
  });

  test('Should return an planet on success', async () => {
    await request(app)
      .post('/planets')
      .send({
        name: 'any_name',
        climate: 'any_climate',
        ground: 'any_ground',
      })
      .expect(200);
  });

  test('Should return a list of planets successfully', async () => {
    const planetCollection = await MongoHelper.getCollection('planets');
    const planetInDb = await planetCollection.insertOne({
      name: 'any_name',
      climate: 'any_climate',
      ground: 'any_ground',
      movies: 5,
    });

    await request(app)
      .get('/planets')
      .expect([
        {
          name: 'any_name',
          climate: 'any_climate',
          ground: 'any_ground',
          movies: 5,
          id: String(planetInDb.ops[0]._id),
        },
      ]);
  });

  test('Should return a planet based on its name', async () => {
    const planetCollection = await MongoHelper.getCollection('planets');
    const planetInDb = await planetCollection.insertOne({
      name: 'valid_name',
      climate: 'any_climate',
      ground: 'any_ground',
      movies: 5,
    });

    await request(app)
      .get('/planets/name/valid_name')
      .expect({
        name: 'valid_name',
        climate: 'any_climate',
        ground: 'any_ground',
        movies: 5,
        id: String(planetInDb.ops[0]._id),
      });
  });

  test('Should return a planet based on its id', async () => {
    const planetCollection = await MongoHelper.getCollection('planets');
    const planetInDb = await planetCollection.insertOne({
      name: 'valid_name',
      climate: 'any_climate',
      ground: 'any_ground',
      movies: 5,
    });

    const id = planetInDb.ops[0]._id;
    await request(app)
      .get(`/planets/id/${id}`)
      .expect({
        name: 'valid_name',
        climate: 'any_climate',
        ground: 'any_ground',
        movies: 5,
        id: String(id),
      });
  });

  test('Should delete a planet based on its id', async () => {
    const planetCollection = await MongoHelper.getCollection('planets');
    const planetInDb = await planetCollection.insertOne({
      name: 'valid_name',
      climate: 'any_climate',
      ground: 'any_ground',
      movies: 5,
    });

    const id = planetInDb.ops[0]._id;
    await request(app).delete(`/planets/${id}`);

    await request(app).get(`/planets/id/${id}`).expect(404);
  });
});
