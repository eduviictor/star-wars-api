import { DeletePlanets } from '@/domain/usecases/delete-planets';
import { DeletePlanetsRepository } from '../protocols/db/db-delete-planets-repository';

export class DbDeletePlanets implements DeletePlanets {
  constructor(
    private readonly deletePlanetsRepository: DeletePlanetsRepository
  ) {}

  async delete(id: string): Promise<void> {
    await this.deletePlanetsRepository.delete(id);
  }
}
