import { PlanetModel } from "../models/Planet";

export interface AddPlanetModel {
  namename: string;
  climate: string;
  ground: string;
}

export interface AddPlanet {
  add: (planet: AddPlanetModel) => Promise<PlanetModel>;
}
