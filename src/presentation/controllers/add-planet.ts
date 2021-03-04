import { AddPlanet } from '@/domain/usecases/add-planet';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class AddPlanetController implements Controller {
  constructor(private readonly addPlanet: AddPlanet) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'climate', 'ground'];

    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    const { name, climate, ground } = request.body;

    await this.addPlanet.add({ name, climate, ground });
  }
}
