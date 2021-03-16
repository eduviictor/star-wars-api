import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import { MissingParamError } from '../errors/missing-param-error';
import { serverError, ok, badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class GetPlanetsByIdController implements Controller {
  constructor(private readonly getPlanetsById: GetPlanetsById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { id },
      } = request;

      if (!id) {
        return badRequest(new MissingParamError('id'));
      }

      const planet = await this.getPlanetsById.getById(id);

      return ok(planet);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
