import { PlanetModel } from '@/domain/models/planet';
import { GetPlanets } from '@/domain/usecases/get-planets';
import { GetPlanetsRepository } from '../protocols/db/db-get-planets-repository';

export class DbGetPlanets implements GetPlanets {
  constructor(private readonly getPlanetsRepository: GetPlanetsRepository) {}

  async index(): Promise<PlanetModel[]> {
    return await this.getPlanetsRepository.index();
  }
}
