import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanetsRepository {
  index: () => Promise<PlanetModel[]>;
}
