import { AddPlanet } from '@/domain/usecases/add-planet';
import { PlanetMongoRepository } from '@/infra/db/mongodb/planet-repository/planet';
import { SwapiAdapter } from '@/infra/swapi/swapi-adapter';
import { AddPlanetController } from '@/presentation/controllers/add-planet';
import { DbAddPlanet } from '@/services/usecases/db-add-planet';
import { AxiosAdapter } from '@/utils/http/axios/axios-adapter';

export const makeAddPlanetController = (): AddPlanetController => {
  const axiosAdapter = new AxiosAdapter();
  const addPlanetRepository = new PlanetMongoRepository();
  const swapiAdapter = new SwapiAdapter(axiosAdapter);
  const dbAddPlanet = new DbAddPlanet(swapiAdapter, addPlanetRepository);
  return new AddPlanetController(dbAddPlanet);
};
