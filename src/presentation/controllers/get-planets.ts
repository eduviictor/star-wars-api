import { GetPlanets } from '@/domain/usecases/get-planets';
import { serverError, ok } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class GetPlanetsController implements Controller {
  constructor(private readonly getPlanets: GetPlanets) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const planets = await this.getPlanets.index();

      return ok(planets);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
