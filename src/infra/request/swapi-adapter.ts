import { MoviesPlanet } from '@/services/protocols/request/movies-planet';
import { ApiRequest } from '../protocols/api-request';
import { SwapiResponse } from '../protocols/swapi-response';
import { SwapiConfig } from './swapi-config';

export class SwapiAdapter implements MoviesPlanet {
  private baseUrl = SwapiConfig.url;
  private headersSwapi = SwapiConfig.headers;

  constructor(private readonly apiRequest: ApiRequest) {}

  async getMoviesPlanet(name: string): Promise<number> {
    const numberMovies = await this.call(
      `${this.baseUrl}/planets`,
      this.headersSwapi,
      name
    );

    if (!numberMovies) {
      return 0;
    }

    return numberMovies;
  }

  async call(url: string, headers: {}, name: string): Promise<number> {
    const response: SwapiResponse = await this.apiRequest.get(url, headers);

    const arrayPlanets = response.results;

    const planet = arrayPlanets.find((planet) => planet.name == name);

    if (planet) {
      if (!planet.films) {
        return 0;
      }
      return planet.films.length;
    }

    if (!response.next) {
      return 0;
    }

    return this.call(response.next, headers, name);
  }
}
