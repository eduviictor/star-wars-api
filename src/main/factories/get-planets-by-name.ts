import { PlanetMongoRepository } from '@/infra/db/mongodb/planet-repository/planet';
import { GetPlanetsByNameController } from '@/presentation/controllers/get-planets-by-name';
import { Controller } from '@/presentation/protocols/controller';
import { DbGetPlanetsByName } from '@/services/usecases/db-get-planets-by-name';

export const makeGetPlanetsByNameController = (): Controller => {
  const planetRepository = new PlanetMongoRepository();
  const dbGetPlanetsByName = new DbGetPlanetsByName(planetRepository);
  return new GetPlanetsByNameController(dbGetPlanetsByName);
};
