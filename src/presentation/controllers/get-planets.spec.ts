import { PlanetModel } from '@/domain/models/planet';
import { GetPlanets } from '@/domain/usecases/get-planets';
import { ServerError } from '../errors/server-error';
import { GetPlanetsController } from './get-planets';

const makeGetPlanets = (): GetPlanets => {
  class GetPlanetsStub implements GetPlanets {
    async index(): Promise<PlanetModel[]> {
      const fakePlanet = {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 5,
      };

      return await new Promise((resolve) => resolve([fakePlanet]));
    }
  }
  return new GetPlanetsStub();
};

interface SutTypes {
  sut: GetPlanetsController;
  getPlanetsStub: GetPlanets;
}

const makeSut = (): SutTypes => {
  const getPlanetsStub = makeGetPlanets();
  const sut = new GetPlanetsController(getPlanetsStub);
  return {
    sut,
    getPlanetsStub,
  };
};

describe('GetPlanets Controller', () => {
  test('Should return 500 if GetPlanets throws', async () => {
    const { sut, getPlanetsStub } = makeSut();
    jest.spyOn(getPlanetsStub, 'index').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
