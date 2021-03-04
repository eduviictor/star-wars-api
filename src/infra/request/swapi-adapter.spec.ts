import { ApiRequest } from '../protocols/api-request';
import { SwapiResponse } from '../protocols/swapi-response';
import { SwapiAdapter } from './swapi-adapter';
import { SwapiConfig } from './swapi-config';

const makeApiRequest = (): ApiRequest => {
  class ApiRequestStub implements ApiRequest {
    async get (url: string, headers?: any): Promise<any> {
      const fakeResponse: SwapiResponse = {
        results: [
          {
            name: 'any_name',
            films: ['any_film', 'any_film']
          }
        ],
        next: null,
        previous: null
      };
      return await new Promise((resolve) => resolve(fakeResponse));
    }
  }
  return new ApiRequestStub();
};

interface SutTypes {
  sut: SwapiAdapter
  apiRequestStub: ApiRequest
}

const makeSut = (): SutTypes => {
  const apiRequestStub = makeApiRequest();
  const sut = new SwapiAdapter(apiRequestStub);
  return {
    sut,
    apiRequestStub
  };
};

describe('Swapi Adapter', () => {
  test('Should SwapiAdapter call ApiRequest with correct values', async () => {
    const { sut, apiRequestStub } = makeSut();
    const apiRequestSpy = jest.spyOn(apiRequestStub, 'get');

    await sut.getMoviesPlanet('any_planet');
    const expectedUrl = `${SwapiConfig.url}/planets`;

    expect(apiRequestSpy).toHaveBeenCalledWith(
      expectedUrl,
      SwapiConfig.headers
    );
  });

  test('Should SwapiAdapter find the planet on the first request', async () => {
    const { sut } = makeSut();
    const numberMovies = await sut.getMoviesPlanet('any_name');
    expect(numberMovies).toBe(2);
  });

  test('Should SwapiAdapter returns 0 if planet not found', async () => {
    const { sut } = makeSut();

    const numberMovies = await sut.getMoviesPlanet('name_not_found');
    expect(numberMovies).toBe(0);
  });

  test('Should SwapiAdapter find the planet on the five request', async () => {
    const { sut, apiRequestStub } = makeSut();

    const responseNotFound: SwapiResponse = {
      results: [
        {
          name: 'any_name',
          films: ['any_film', 'any_film']
        }
      ],
      next: 'any_next_page',
      previous: null
    };

    const responseFound: SwapiResponse = {
      results: [
        {
          name: 'valid_name',
          films: ['any_film', 'any_film']
        }
      ],
      next: 'any_next_page',
      previous: null
    };

    jest
      .spyOn(apiRequestStub, 'get')
      .mockReturnValueOnce(new Promise((resolve) => resolve(responseNotFound)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(responseNotFound)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(responseNotFound)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(responseNotFound)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(responseFound)));

    const numberMovies = await sut.getMoviesPlanet('valid_name');
    expect(numberMovies).toBe(2);
  });

  test('Should SwapiAdapter must return 0 if there are no films with this planet', async () => {
    const { sut, apiRequestStub } = makeSut();

    const responseWithoutFilms: SwapiResponse = {
      results: [
        {
          name: 'planet_without_films',
          films: null
        }
      ],
      next: 'any_next_page',
      previous: null
    };

    jest
      .spyOn(apiRequestStub, 'get')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(responseWithoutFilms))
      );

    const numberMovies = await sut.getMoviesPlanet('planet_without_films');
    expect(numberMovies).toBe(0);
  });
});
