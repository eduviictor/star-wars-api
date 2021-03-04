import { PlanetModel } from '@/domain/models/planet';
import { AddPlanet, AddPlanetModel } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '../protocols/db/add-planet-repository';
import { MoviesPlanet } from '../protocols/request/movies-planet';

export class DbAddPlanet implements AddPlanet {
  constructor(
    private readonly moviesPlanet: MoviesPlanet,
    private readonly addPlanetRepository: AddPlanetRepository
  ) {}

  async add(planet: AddPlanetModel): Promise<PlanetModel> {
    const { name, climate, ground } = planet;
    const numberMovies = await this.moviesPlanet.get(name);

    const planetResult = await this.addPlanetRepository.add({
      name,
      climate,
      ground,
      movies: numberMovies,
    });

    return planetResult;
  }
}
