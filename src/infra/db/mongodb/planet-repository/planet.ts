import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModelDatabase } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '@/services/protocols/db/db-add-planet-repository';
import { GetPlanetsByNameRepository } from '@/services/protocols/db/db-get-planets-by-name-repository';
import { GetPlanetsRepository } from '@/services/protocols/db/db-get-planets-repository';
import { MongoHelper } from '../helpers/mongo-helper';

export class PlanetMongoRepository
  implements
    AddPlanetRepository,
    GetPlanetsRepository,
    GetPlanetsByNameRepository {
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

  async getByName(name: string): Promise<PlanetModel> {
    const planetCollection = await MongoHelper.getCollection('planets');
    const result = await planetCollection.findOne({
      name: name,
    });
    if (!result) {
      return null;
    }
    return MongoHelper.map(result);
  }
}
