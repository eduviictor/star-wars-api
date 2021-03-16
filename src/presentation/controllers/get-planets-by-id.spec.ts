import { PlanetModel } from '@/domain/models/planet';
import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import FakeObjectId from 'bson-objectid';
import { InvalidParamError } from '../errors/invalid-param-error';
import { MissingParamError } from '../errors/missing-param-error';
import { ServerError } from '../errors/server-error';
import { GetPlanetsByIdController } from './get-planets-by-id';

const validId = new FakeObjectId();

const makeGetPlanetsById = (): GetPlanetsById => {
  class GetPlanetsByIdStub implements GetPlanetsById {
    async getById(id: string): Promise<PlanetModel> {
      const fakePlanet = {
        id: String(validId),
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
      params: { id: String(validId) },
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
        id: String(validId),
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: String(validId),
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 5,
    });
  });

  test('Should return 400 if no id param is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('Should return 400 if id is not valid', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
      params: { id: 'invalid_id' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('id'));
  });
});
