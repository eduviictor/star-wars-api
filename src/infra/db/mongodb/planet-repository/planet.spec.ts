import { MongoHelper } from '../helpers/mongo-helper';
import { PlanetMongoRepository } from './planet';

describe('Planet Mongo Repository', () => {
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

  const makeSut = (): PlanetMongoRepository => {
    return new PlanetMongoRepository();
  };

  test('Should return an planet on success', async () => {
    const sut = makeSut();

    const planet = await sut.add({
      name: 'any_name',
      climate: 'any_climate',
      ground: 'any_ground',
      movies: 5,
    });

    expect(planet).toBeTruthy();
    expect(planet.id).toBeTruthy();
    expect(planet.name).toBe('any_name');
    expect(planet.climate).toBe('any_climate');
    expect(planet.ground).toBe('any_ground');
    expect(planet.movies).toBe(5);
  });
});
