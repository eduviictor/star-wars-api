import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModel } from '@/domain/usecases/add-planet';

export interface DbAddPlanet {
  add(planet: AddPlanetModel): Promise<PlanetModel>;
}
