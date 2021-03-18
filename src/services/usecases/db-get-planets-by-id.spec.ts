import { PlanetModel } from '@/domain/models/planet';
import { DbGetPlanetsById } from './db-get-planets-by-id';
import { GetPlanetsByIdRepository } from '../protocols/db/db-get-planets-by-id-repository';

const makeGetPlanetsByIdRepository = (): GetPlanetsByIdRepository => {
  class GetPlanetsByIdRepositoryStub implements GetPlanetsByIdRepository {
    async getById(): Promise<PlanetModel> {
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

  return new GetPlanetsByIdRepositoryStub();
};

interface SutTypes {
  sut: DbGetPlanetsById;
  getPlanetsByIdRepositoryStub: GetPlanetsByIdRepository;
}

const makeSut = (): SutTypes => {
  const getPlanetsByIdRepositoryStub = makeGetPlanetsByIdRepository();
  const sut = new DbGetPlanetsById(getPlanetsByIdRepositoryStub);
  return {
    sut,
    getPlanetsByIdRepositoryStub,
  };
};

describe('DbGetPlanetsById Usecase', () => {
  test('Should call GetPlanetsByIdRepository', async () => {
    const { sut, getPlanetsByIdRepositoryStub } = makeSut();
    const getByIdSpy = jest.spyOn(getPlanetsByIdRepositoryStub, 'getById');

    await sut.getById('any_id');

    expect(getByIdSpy).toHaveBeenCalledTimes(1);
  });

  test('Should GetPlanetsByIdRepository return an planet with success', async () => {
    const { sut } = makeSut();

    const planets = await sut.getById('valid_id');

    expect(planets).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 5,
    });
  });

  test('Should throw if GetPlanetsByIdRepository throws', async () => {
    const { sut, getPlanetsByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPlanetsByIdRepositoryStub, 'getById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.getById('any_id');

    await expect(promise).rejects.toThrow();
  });
});
