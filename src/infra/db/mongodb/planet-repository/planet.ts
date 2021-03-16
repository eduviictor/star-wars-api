import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModelDatabase } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '@/services/protocols/db/db-add-planet-repository';
import { GetPlanetsRepository } from '@/services/protocols/db/db-get-planets-repository';
import { MongoHelper } from '../helpers/mongo-helper';

export class PlanetMongoRepository
  implements AddPlanetRepository, GetPlanetsRepository {
  async add(planetData: AddPlanetModelDatabase): Promise<PlanetModel> {
    const planetCollection = await MongoHelper.getCollection('planets');
    const result = await planetCollection.insertOne(planetData);
    return MongoHelper.map(result.ops[0]);
  }

  async index(): Promise<PlanetModel[]> {
    const planetCollection = await MongoHelper.getCollection('planets');
    const result = await planetCollection.find().toArray();
    return MongoHelper.mapCollection(result);
  }
}
