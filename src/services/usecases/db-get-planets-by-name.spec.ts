import { PlanetModel } from '@/domain/models/planet';
import { DbGetPlanetsByName } from './db-get-planets-by-name';
import { GetPlanetsByNameRepository } from '../protocols/db/db-get-planets-by-name-repository';

const makeGetPlanetsByNameRepository = (): GetPlanetsByNameRepository => {
  class GetPlanetsByNameRepositoryStub implements GetPlanetsByNameRepository {
    async getByName(): Promise<PlanetModel> {
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

  return new GetPlanetsByNameRepositoryStub();
};

interface SutTypes {
  sut: DbGetPlanetsByName;
  getPlanetsByNameRepositoryStub: GetPlanetsByNameRepository;
}

const makeSut = (): SutTypes => {
  const getPlanetsByNameRepositoryStub = makeGetPlanetsByNameRepository();
  const sut = new DbGetPlanetsByName(getPlanetsByNameRepositoryStub);
  return {
    sut,
    getPlanetsByNameRepositoryStub,
  };
};

describe('DbGetPlanetsByName Usecase', () => {
  test('Should call GetPlanetsByNameRepository', async () => {
    const { sut, getPlanetsByNameRepositoryStub } = makeSut();
    const getByNameSpy = jest.spyOn(
      getPlanetsByNameRepositoryStub,
      'getByName'
    );

    await sut.getByName('any_name');

    expect(getByNameSpy).toHaveBeenCalledTimes(1);
  });

  test('Should GetPlanetsByNameRepository return an planet with success', async () => {
    const { sut } = makeSut();

    const planets = await sut.getByName('valid_name');

    expect(planets).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 5,
    });
  });

  test('Should throw if GetPlanetsByNameRepository throws', async () => {
    const { sut, getPlanetsByNameRepositoryStub } = makeSut();
    jest
      .spyOn(getPlanetsByNameRepositoryStub, 'getByName')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.getByName('any_name');

    await expect(promise).rejects.toThrow();
  });
});
