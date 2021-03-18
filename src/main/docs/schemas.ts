import { addPlanetParamsSchema } from './schemas/add-planet-schema';
import { errorSchema } from './schemas/error-schema';
import { planetListSchema } from './schemas/planet-list-schema';
import { planetSchema } from './schemas/planet-schema';

export default {
  planet: planetSchema,
  planetList: planetListSchema,
  addPlanetParams: addPlanetParamsSchema,
  error: errorSchema,
};
