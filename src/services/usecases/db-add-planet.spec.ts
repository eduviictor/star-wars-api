import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModel } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '../protocols/db/add-planet-repository';
import { MoviesPlanet } from '../protocols/request/movies-planet';
import { DbAddPlanet } from './db-add-planet';

const makeMoviesPlanet = (): MoviesPlanet => {
  class MoviesPlanetStub implements MoviesPlanet {
    async get(value: string): Promise<number> {
      return await new Promise((resolve) => resolve(10));
    }
  }

  return new MoviesPlanetStub();
};

const makeAddPlanetRepository = (): AddPlanetRepository => {
  class AddPlanetRepositoryStub implements AddPlanetRepository {
    async add(planet: AddPlanetModel): Promise<PlanetModel> {
      const fakePlanet = {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 10,
      };
      return await new Promise((resolve) => resolve(fakePlanet));
    }
  }

  return new AddPlanetRepositoryStub();
};

interface SutTypes {
  sut: DbAddPlanet;
  moviesPlanetStub: MoviesPlanet;
  addPlanetRepositoryStub: AddPlanetRepository;
}

const makeSut = (): SutTypes => {
  const moviesPlanetStub = makeMoviesPlanet();
  const addPlanetRepositoryStub = makeAddPlanetRepository();
  const sut = new DbAddPlanet(moviesPlanetStub, addPlanetRepositoryStub);
  return {
    sut,
    moviesPlanetStub,
    addPlanetRepositoryStub,
  };
};

describe('DbAddPlanet Usecase', () => {
  test('Should call MoviesPlanet with correct name', async () => {
    const { sut, moviesPlanetStub } = makeSut();
    const moviesPlanetSpy = jest.spyOn(moviesPlanetStub, 'get');
    const planetData = {
      name: 'any_name',
      climate: 'any_climate',
      ground: 'any_ground',
    };

    await sut.add(planetData);

    expect(moviesPlanetSpy).toHaveBeenCalledWith('any_name');
  });

  test('Should throw if MoviesPlanet throws', async () => {
    const { sut, moviesPlanetStub } = makeSut();
    jest
      .spyOn(moviesPlanetStub, 'get')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const planetData = {
      name: 'any_name',
      climate: 'any_climate',
      ground: 'any_ground',
    };
    const promise = sut.add(planetData);

    await expect(promise).rejects.toThrow();
  });

  test('Should call AddPlanetRepository with correct values', async () => {
    const { sut, moviesPlanetStub, addPlanetRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addPlanetRepositoryStub, 'add');
    jest
      .spyOn(moviesPlanetStub, 'get')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(10)));

    const planetData = {
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
    };

    await sut.add(planetData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 10,
    });
  });
});
