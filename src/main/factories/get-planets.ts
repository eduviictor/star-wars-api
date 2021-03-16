import { PlanetMongoRepository } from '@/infra/db/mongodb/planet-repository/planet';
import { GetPlanetsController } from '@/presentation/controllers/get-planets';
import { Controller } from '@/presentation/protocols/controller';
import { DbGetPlanets } from '@/services/usecases/db-get-planets';

export const makeGetPlanetsController = (): Controller => {
  const planetRepository = new PlanetMongoRepository();
  const dbGetPlanets = new DbGetPlanets(planetRepository);
  return new GetPlanetsController(dbGetPlanets);
};
