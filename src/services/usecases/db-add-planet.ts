import { PlanetModel } from '@/domain/models/planet';
import { AddPlanet, AddPlanetModel } from '@/domain/usecases/add-planet';
import { MoviesPlanet } from '../protocols/request/movies-planet';

export class DbAddPlanet implements AddPlanet {
  constructor(private readonly moviesPlanet: MoviesPlanet) {}

  add(planet: AddPlanetModel): Promise<PlanetModel> {
    this.moviesPlanet.get(planet.name);
  }
}
