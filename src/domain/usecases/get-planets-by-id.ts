import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanetsById {
  getById: (id: string) => Promise<PlanetModel>;
}
