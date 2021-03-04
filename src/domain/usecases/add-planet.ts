import { PlanetModel, PlanetModelCreate } from '../models/planet';

export interface AddPlanetModel {
  name: string;
  climate: string;
  ground: string;
}

export interface AddPlanet {
  add: (planet: AddPlanetModel) => Promise<PlanetModelCreate>;
}
