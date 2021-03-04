import { MoviesPlanet } from '@/services/protocols/request/movies-planet';
import { ApiRequest } from '../protocols/api-request';
import { SwapiResponse } from '../protocols/swapi-response';
import { SwapiConfig } from './swapi-config';

export class SwapiAdapter implements MoviesPlanet {
  private baseUrl = SwapiConfig.url;
  private headersSwapi = SwapiConfig.headers;

  constructor(private readonly apiRequest: ApiRequest) {}

  async getMoviesPlanet(name: string): Promise<number> {
    const response: SwapiResponse = await this.apiRequest.get(
      `${this.baseUrl}/planets`,
      this.headersSwapi
    );

    const arrayPlanets = response.results;

    const planet = arrayPlanets.find((planet) => planet.name == name);

    if (!planet) {
      return false;
    }
    return planet?.films.length;
  }
}
