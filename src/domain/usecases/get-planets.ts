import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanets {
  index: () => Promise<PlanetModel[]>;
}
