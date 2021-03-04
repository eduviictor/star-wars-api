import { AddPlanet } from '@/domain/usecases/add-planet';
import { MissingParamError } from '../errors/missing-param-error';
import { ServerError } from '../errors/server-error';
import { badRequest, serverError } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class AddPlanetController implements Controller {
  constructor(private readonly addPlanet: AddPlanet) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'climate', 'ground'];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { name, climate, ground } = request.body;

      await this.addPlanet.add({ name, climate, ground });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
