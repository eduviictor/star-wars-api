import { PlanetModelCreate } from '../models/planet';

export interface AddPlanetModel {
  name: string;
  climate: string;
  ground: string;
}

export interface AddPlanetModelDatabase {
  name: string;
  climate: string;
  ground: string;
  movies: number;
}

export interface AddPlanet {
  add: (planet: AddPlanetModel) => Promise<PlanetModelCreate>;
}
