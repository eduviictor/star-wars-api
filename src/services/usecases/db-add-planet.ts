import { PlanetModel } from '@/domain/models/planet';
import { AddPlanet, AddPlanetModel } from '@/domain/usecases/add-planet';
import { MoviesPlanet } from '../protocols/request/movies-planet';

export class DbAddPlanet implements AddPlanet {
  constructor(private readonly moviesPlanet: MoviesPlanet) {}

  async add(planet: AddPlanetModel): Promise<PlanetModel> {
    const numberMovies = await this.moviesPlanet.get(planet.name);
    return null;
  }
}
