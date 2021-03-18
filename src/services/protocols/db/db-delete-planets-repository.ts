export interface DeletePlanetsRepository {
  delete: (id: string) => Promise<void>;
}
