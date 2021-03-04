import { PlanetModel } from '@/domain/models/planet';
import { AddPlanet, AddPlanetModel } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '../protocols/db/add-planet-repository';
import { MoviesPlanet } from '../protocols/request/movies-planet';

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly moviesPlanet: MoviesPlanet,
    private readonly addPlanetRepository: AddPlanetRepository
  ) {}

  async add (planet: AddPlanetModel): Promise<PlanetModel> {
    const { name, climate, ground } = planet;
    const numberMovies = await this.moviesPlanet.getMoviesPlanet(name);
    let movies = 0;
    if (numberMovies) {
      movies = numberMovies;
    }

    const planetResult = await this.addPlanetRepository.add({
      name,
      climate,
      ground,
      movies
    });

    return planetResult;
  }
}
