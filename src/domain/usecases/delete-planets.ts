import { PlanetModel } from '@/domain/models/planet';

export interface DeletePlanets {
  delete: (id: string) => Promise<boolean>;
}
