import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanetsByNameRepository {
  getByName: (name: string) => Promise<PlanetModel>;
}
