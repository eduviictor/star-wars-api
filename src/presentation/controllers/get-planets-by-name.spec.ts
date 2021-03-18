import { PlanetModel } from '@/domain/models/planet';
import { GetPlanetsByName } from '@/domain/usecases/get-planets-by-name';
import { MissingParamError } from '../errors/missing-param-error';
import { ServerError } from '../errors/server-error';
import { GetPlanetsByNameController } from './get-planets-by-name';

const makeGetPlanetsByName = (): GetPlanetsByName => {
  class GetPlanetsByNameStub implements GetPlanetsByName {
    async getByName(name: string): Promise<PlanetModel> {
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
  return new GetPlanetsByNameStub();
};

interface SutTypes {
  sut: GetPlanetsByNameController;
  getPlanetsByNameStub: GetPlanetsByName;
}

const makeSut = (): SutTypes => {
  const getPlanetsByNameStub = makeGetPlanetsByName();
  const sut = new GetPlanetsByNameController(getPlanetsByNameStub);
  return {
    sut,
    getPlanetsByNameStub,
  };
};

describe('GetPlanetByName Controller', () => {
  test('Should return 500 if GetPlanetByName throws', async () => {
    const { sut, getPlanetsByNameStub } = makeSut();
    jest
      .spyOn(getPlanetsByNameStub, 'getByName')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()));
      });
    const httpRequest = {
      body: {},
      params: { name: 'any_name' },
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
        name: 'valid_name',
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

  test('Should return 400 if no name param is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 404 if not found id', async () => {
    const { sut, getPlanetsByNameStub } = makeSut();
    jest
      .spyOn(getPlanetsByNameStub, 'getByName')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => resolve(null));
      });
    const httpRequest = {
      body: {},
      params: { name: 'invalid_name' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(404);
  });
});
