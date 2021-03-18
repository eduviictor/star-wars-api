import { PlanetMongoRepository } from '@/infra/db/mongodb/planet-repository/planet';
import { DeletePlanetsController } from '@/presentation/controllers/delete-planets';
import { Controller } from '@/presentation/protocols/controller';
import { DbDeletePlanets } from '@/services/usecases/db-delete-planets';
import { DbGetPlanetsById } from '@/services/usecases/db-get-planets-by-id';

export const makeDeletePlanetsController = (): Controller => {
  const planetRepository = new PlanetMongoRepository();
  const dbGetPlanetsById = new DbGetPlanetsById(planetRepository);
  const dbDeletePlanets = new DbDeletePlanets(planetRepository);
  return new DeletePlanetsController(dbGetPlanetsById, dbDeletePlanets);
};
