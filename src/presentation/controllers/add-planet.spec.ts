import { MissingParamError } from '@/presentation/errors/missing-param-error';
import { AddPlanetController } from '@/presentation/controllers/add-planet';
import { AddPlanet, AddPlanetModel } from '@/domain/usecases/add-planet';
import { PlanetModelCreate } from '@/domain/models/planet';
import { ServerError } from '../errors/server-error';

const makeAddPlanet = (): AddPlanet => {
  class AddPlanetStub implements AddPlanet {
    async add(planet: AddPlanetModel): Promise<PlanetModelCreate> {
      const fakePlanet = {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 5,
      };

      return await new Promise((resolve) => resolve(fakePlanet));
    }
  }
  return new AddPlanetStub();
};

interface SutTypes {
  sut: AddPlanetController;
  addPlanetStub: AddPlanet;
}

const makeSut = (): SutTypes => {
  const addPlanetStub = makeAddPlanet();
  const sut = new AddPlanetController(addPlanetStub);
  return {
    sut,
    addPlanetStub,
  };
};

describe('AddPlanet Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        climate: 'any_climate',
        ground: 'any_ground',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no climate is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        ground: 'any_ground',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('climate'));
  });

  test('Should return 400 if no ground is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        climate: 'any_climate',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('ground'));
  });

  test('Should call AddPlanet with correct values', async () => {
    const { sut, addPlanetStub } = makeSut();
    const addSpy = jest.spyOn(addPlanetStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        climate: 'any_climate',
        ground: 'any_ground',
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      climate: 'any_climate',
      ground: 'any_ground',
    });
  });

  test('Should return 500 if AddPlanet throws', async () => {
    const { sut, addPlanetStub } = makeSut();
    jest.spyOn(addPlanetStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        climate: 'any_climate',
        ground: 'any_ground',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addPlanetStub } = makeSut();
    jest.spyOn(addPlanetStub, 'add').mockImplementationOnce(async () => {
      return await {
        id: 'valid_id',
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
        movies: 5,
      };
    });
    const httpRequest = {
      body: {
        name: 'valid_name',
        climate: 'valid_climate',
        ground: 'valid_ground',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: httpRequest.body.name,
      climate: httpRequest.body.climate,
      ground: httpRequest.body.ground,
      movies: 5,
    });
  });
});
