import { GetPlanetsByName } from '@/domain/usecases/get-planets-by-name';
import { MissingParamError } from '../errors/missing-param-error';
import { serverError, ok, badRequest, notFound } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class GetPlanetsByNameController implements Controller {
  constructor(private readonly getPlanetsByName: GetPlanetsByName) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { name },
      } = request;

      if (!name) {
        return badRequest(new MissingParamError('name'));
      }

      const planet = await this.getPlanetsByName.getByName(name);

      if (!planet) {
        return notFound('Name is not found');
      }

      return ok(planet);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
