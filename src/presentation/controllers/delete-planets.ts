import { DeletePlanets } from '@/domain/usecases/delete-planets';
import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import { MissingParamError } from '../errors/missing-param-error';
import { serverError, badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class DeletePlanetsController implements Controller {
  constructor(
    private readonly getPlanetsById: GetPlanetsById,
    private readonly deletePlanets: DeletePlanets
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { id },
      } = request;

      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
