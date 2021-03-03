import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class AddPlanetController implements Controller {
  constructor() {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new MissingParamError("name"));
    }
  }
}
