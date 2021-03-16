import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanetsByName {
  getByName: (name: string) => Promise<PlanetModel>;
}
