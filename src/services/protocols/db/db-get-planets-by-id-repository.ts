import { PlanetModel } from '@/domain/models/planet';

export interface GetPlanetsByIdRepository {
  getById: (id: string) => Promise<PlanetModel>;
}
