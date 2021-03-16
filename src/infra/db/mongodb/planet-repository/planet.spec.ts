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

  describe('add()', () => {
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

  describe('index()', () => {
    test('Should return a list of planets successfully', async () => {
      const sut = makeSut();

      await sut.add({
        name: 'any_name',
        climate: 'any_climate',
        ground: 'any_ground',
        movies: 5,
      });

      const planets = await sut.index();

      expect(planets).toBeTruthy();
      expect(Array.isArray(planets)).toBe(true);
      expect(planets[0].id).toBeTruthy();
      expect(planets[0].name).toBe('any_name');
      expect(planets[0].climate).toBe('any_climate');
      expect(planets[0].ground).toBe('any_ground');
      expect(planets[0].movies).toBe(5);
    });
  });

  describe('getByName()', () => {
    test('Should return an planet with success', async () => {
      const sut = makeSut();

      await sut.add({
        name: 'valid_name',
        climate: 'any_climate',
        ground: 'any_ground',
        movies: 5,
      });

      const planet = await sut.getByName('valid_name');
      console.log(planet);

      expect(planet).toBeTruthy();
      expect(planet.name).toBe('valid_name');
      expect(planet.climate).toBe('any_climate');
      expect(planet.ground).toBe('any_ground');
      expect(planet.movies).toBe(5);
    });
  });
});
