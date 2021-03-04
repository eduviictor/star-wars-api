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

interface SutTypes {
  sut: DbAddPlanet;
  moviesPlanetStub: MoviesPlanet;
}

const makeSut = (): SutTypes => {
  const moviesPlanetStub = makeMoviesPlanet();
  const sut = new DbAddPlanet(moviesPlanetStub);
  return {
    sut,
    moviesPlanetStub,
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
});
