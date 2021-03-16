import { PlanetMongoRepository } from '@/infra/db/mongodb/planet-repository/planet';
import { GetPlanetsByIdController } from '@/presentation/controllers/get-planets-by-id';
import { Controller } from '@/presentation/protocols/controller';
import { DbGetPlanetsById } from '@/services/usecases/db-get-planets-by-id';

export const makeGetPlanetsByIdController = (): Controller => {
  const planetRepository = new PlanetMongoRepository();
  const dbGetPlanetsById = new DbGetPlanetsById(planetRepository);
  return new GetPlanetsByIdController(dbGetPlanetsById);
};
