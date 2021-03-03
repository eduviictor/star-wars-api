import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { AddPlanetController } from "@/presentation/controllers/add-planet";
import { AddPlanet } from "@/domain/usecases/add-planet";

const makeSut = (): AddPlanetController => {
  return new AddPlanetController();
};

describe("AddPlanet Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        climate: "any_climate",
        ground: "any_ground"
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    console.log(httpResponse);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });
});
