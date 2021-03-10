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
});
