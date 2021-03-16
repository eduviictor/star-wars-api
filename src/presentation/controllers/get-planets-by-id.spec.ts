import { PlanetModel } from '@/domain/models/planet';
import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import { MissingParamError } from '../errors/missing-param-error';
import { ServerError } from '../errors/server-error';
import { GetPlanetsByIdController } from './get-planets-by-id';

const makeGetPlanetsById = (): GetPlanetsById => {
  class GetPlanetsByIdStub implements GetPlanetsById {
    async getById(id: string): Promise<PlanetModel> {
      const fakePlanet = {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 5,
      };

      return await new Promise((resolve) => resolve(fakePlanet));
    }
  }
  return new GetPlanetsByIdStub();
};

interface SutTypes {
  sut: GetPlanetsByIdController;
  getPlanetsByIdStub: GetPlanetsById;
}

const makeSut = (): SutTypes => {
  const getPlanetsByIdStub = makeGetPlanetsById();
  const sut = new GetPlanetsByIdController(getPlanetsByIdStub);
  return {
    sut,
    getPlanetsByIdStub,
  };
};

describe('GetPlanetsById Controller', () => {
  test('Should return 500 if GetPlanetsById throws', async () => {
    const { sut, getPlanetsByIdStub } = makeSut();
    jest
      .spyOn(getPlanetsByIdStub, 'getById')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()));
      });
    const httpRequest = {
      body: {},
      params: { id: 'valid_id' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if all goes well', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
      params: {
        id: 'valid_id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 5,
    });
  });
});
