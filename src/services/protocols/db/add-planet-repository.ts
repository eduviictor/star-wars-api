import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModel } from '@/domain/usecases/add-planet';

interface AddPlanetModelWithMovies extends AddPlanetModel {
  movies: number;
}

export interface AddPlanetRepository {
  add(planet: AddPlanetModelWithMovies): Promise<PlanetModel>;
}
