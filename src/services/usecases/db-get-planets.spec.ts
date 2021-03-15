import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModel } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '../protocols/db/add-planet-repository';
import { GetPlanetsRepository } from '../protocols/db/db-get-planets-repository';
import { MoviesPlanet } from '../protocols/request/movies-planet';
import { DbAddPlanet } from './db-add-planet';
import { DbGetPlanets } from './db-get-planets';

const makeGetPlanetsRepository = (): GetPlanetsRepository => {
  class GetPlanetsRepositoryStub implements GetPlanetsRepository {
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

  return new GetPlanetsRepositoryStub();
};

interface SutTypes {
  sut: DbGetPlanets;
  getPlanetsRepositoryStub: GetPlanetsRepository;
}

const makeSut = (): SutTypes => {
  const getPlanetsRepositoryStub = makeGetPlanetsRepository();
  const sut = new DbGetPlanets(getPlanetsRepositoryStub);
  return {
    sut,
    getPlanetsRepositoryStub,
  };
};

describe('DbGetPlanets Usecase', () => {
  test('Should call GetPlanetsRepository', async () => {
    const { sut, getPlanetsRepositoryStub } = makeSut();
    const indexSpy = jest.spyOn(getPlanetsRepositoryStub, 'index');

    await sut.index();

    expect(indexSpy).toHaveBeenCalledTimes(1);
  });
  test('Should GetPlanetsRepository returns a list of planets successfully', async () => {
    const { sut } = makeSut();

    const planets = await sut.index();

    expect(planets).toEqual([
      {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 5,
      },
    ]);
  });
});
