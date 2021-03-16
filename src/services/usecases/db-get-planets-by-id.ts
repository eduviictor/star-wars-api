import { PlanetModel } from '@/domain/models/planet';
import { GetPlanetsById } from '@/domain/usecases/get-planets-by-id';
import { GetPlanetsByIdRepository } from '../protocols/db/db-get-planets-by-id-repository';

export class DbGetPlanetsById implements GetPlanetsById {
  constructor(
    private readonly getPlanetsRepository: GetPlanetsByIdRepository
  ) {}

  async getById(id: string): Promise<PlanetModel> {
    return await this.getPlanetsRepository.getById(id);
  }
}
