import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModel } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '../protocols/db/add-planet-repository';
import { MoviesPlanet } from '../protocols/request/movies-planet';
import { DbAddPlanet } from './db-add-planet';

const makeMoviesPlanet = (): MoviesPlanet => {
  class MoviesPlanetStub implements MoviesPlanet {
    async getMoviesPlanet(value: string): Promise<number> {
      return await new Promise((resolve) => resolve(5));
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
        movies: 5,
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
    const moviesPlanetSpy = jest.spyOn(moviesPlanetStub, 'getMoviesPlanet');
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
      .spyOn(moviesPlanetStub, 'getMoviesPlanet')
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

  test('Should DbAddPlanet assign 0 if MoviesPlanet return false', async () => {
    const { sut, moviesPlanetStub, addPlanetRepositoryStub } = makeSut();
    jest
      .spyOn(moviesPlanetStub, 'getMoviesPlanet')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));

    const addSpy = jest.spyOn(addPlanetRepositoryStub, 'add');

    const planetData = {
      name: 'invalid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
    };
    await sut.add(planetData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'invalid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 0,
    });
  });

  test('Should call AddPlanetRepository with correct values', async () => {
    const { sut, addPlanetRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addPlanetRepositoryStub, 'add');

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
      movies: 5,
    });
  });

  test('Should return an planet on success', async () => {
    const { sut } = makeSut();

    const planetData = {
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
    };
    const planet = await sut.add(planetData);

    expect(planet).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      climate: 'valid_climate',
      ground: 'valid_ground',
      movies: 5,
    });
  });
});
