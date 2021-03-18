import { DeletePlanetsRepository } from '../protocols/db/db-delete-planets-repository';
import { DbDeletePlanets } from './db-delete-planets';

const makeDeletePlanetsRepository = (): DeletePlanetsRepository => {
  class DeletePlanetsRepositoryStub implements DeletePlanetsRepository {
    async delete(): Promise<void> {
      return await new Promise((resolve) => resolve());
    }
  }

  return new DeletePlanetsRepositoryStub();
};

interface SutTypes {
  sut: DbDeletePlanets;
  deletePlanetsRepositoryStub: DeletePlanetsRepository;
}

const makeSut = (): SutTypes => {
  const deletePlanetsRepositoryStub = makeDeletePlanetsRepository();
  const sut = new DbDeletePlanets(deletePlanetsRepositoryStub);
  return {
    sut,
    deletePlanetsRepositoryStub,
  };
};

describe('DbDeletePlanets Usecase', () => {
  test('Should call DeletePlanetsRepository', async () => {
    const { sut, deletePlanetsRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deletePlanetsRepositoryStub, 'delete');

    await sut.delete('any_id');

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if DeletePlanetsRepository throws', async () => {
    const { sut, deletePlanetsRepositoryStub } = makeSut();
    jest
      .spyOn(deletePlanetsRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.delete('any_id');

    await expect(promise).rejects.toThrow();
  });
});
