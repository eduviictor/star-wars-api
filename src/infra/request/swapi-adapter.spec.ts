import { ApiRequest } from '../protocols/api-request';
import { SwapiResponse } from '../protocols/swapi-response';
import { SwapiAdapter } from './swapi-adapter';
import { SwapiConfig } from './swapi-config';

const makeApiRequest = (): ApiRequest => {
  class ApiRequestStub implements ApiRequest {
    async get(url: string, headers?: any): Promise<any> {
      const fakeResponse: SwapiResponse = {
        results: [
          {
            name: 'any_name',
            films: ['any_film', 'any_film'],
          },
        ],
        next: 'any_next_page',
        previous: null,
      };
      return await new Promise((resolve) => resolve(fakeResponse));
    }
  }
  return new ApiRequestStub();
};

interface SutTypes {
  sut: SwapiAdapter;
  apiRequestStub: ApiRequest;
}

const makeSut = (): SutTypes => {
  const apiRequestStub = makeApiRequest();
  const sut = new SwapiAdapter(apiRequestStub);
  return {
    sut,
    apiRequestStub,
  };
};

describe('Swapi Adapter', () => {
  test('Should call ApiRequest with correct values', async () => {
    const { sut, apiRequestStub } = makeSut();
    const apiRequestSpy = jest.spyOn(apiRequestStub, 'get');

    await sut.getMoviesPlanet('any_planet');
    const expectedUrl = `${SwapiConfig.url}/planets`;

    expect(apiRequestSpy).toHaveBeenCalledWith(
      expectedUrl,
      SwapiConfig.headers
    );
  });

  test('Should find the planet on the first request', async () => {
    const { sut } = makeSut();
    const numberMovies = await sut.getMoviesPlanet('any_name');
    expect(numberMovies).toBe(2);
  });
});
