import { MoviesPlanet } from '@/services/protocols/request/movies-planet';
import { ApiRequest } from '../protocols/api-request';
import { SwapiConfig } from './swapi-config';

export class SwapiAdapter implements MoviesPlanet {
  private baseUrl = SwapiConfig.url;
  private headersSwapi = SwapiConfig.headers;

  constructor(private readonly apiRequest: ApiRequest) {}

  async getMoviesPlanet(name: string): Promise<number> {
    const response = await this.apiRequest.get(
      `${this.baseUrl}/planets`,
      this.headersSwapi
    );
  }
}
