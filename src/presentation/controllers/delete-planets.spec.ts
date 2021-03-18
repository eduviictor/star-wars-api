import { PlanetModel } from '@/domain/models/planet';
import { DeletePlanets } from '@/domain/usecases/delete-planets';
import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import FakeObjectId from 'bson-objectid';
import { InvalidParamError } from '../errors/invalid-param-error';
import { MissingParamError } from '../errors/missing-param-error';
import { ServerError } from '../errors/server-error';
import { DeletePlanetsController } from './delete-planets';

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

const makeDeletePlanets = (): DeletePlanets => {
  class DeletePlanetsStub implements DeletePlanets {
    async delete(id: string): Promise<boolean> {
      return await new Promise((resolve) => resolve(true));
    }
  }
  return new DeletePlanetsStub();
};

interface SutTypes {
  sut: DeletePlanetsController;
  getPlanetsByIdStub: GetPlanetsById;
  deletePlanetsStub: DeletePlanets;
}

const makeSut = (): SutTypes => {
  const getPlanetsByIdStub = makeGetPlanetsById();
  const deletePlanetsStub = makeDeletePlanets();
  const sut = new DeletePlanetsController(
    getPlanetsByIdStub,
    deletePlanetsStub
  );
  return {
    sut,
    getPlanetsByIdStub,
    deletePlanetsStub,
  };
};

describe('DeletePlanets Controller', () => {
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
});
