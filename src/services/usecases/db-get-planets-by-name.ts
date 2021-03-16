import { PlanetModel } from '@/domain/models/planet';
import { GetPlanetsByName } from '@/domain/usecases/get-planets-by-name';
import { GetPlanetsByNameRepository } from '../protocols/db/db-get-planets-by-name-repository';

export class DbGetPlanetsByName implements GetPlanetsByName {
  constructor(
    private readonly getPlanetsRepository: GetPlanetsByNameRepository
  ) {}

  async getByName(name: string): Promise<PlanetModel> {
    return await this.getPlanetsRepository.getByName(name);
  }
}
