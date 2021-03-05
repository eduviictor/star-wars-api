import { PlanetModel } from '@/domain/models/planet';
import { AddPlanetModelDatabase } from '@/domain/usecases/add-planet';
import { AddPlanetRepository } from '@/services/protocols/db/add-planet-repository';
import { MongoHelper } from '../helpers/mongo-helper';

export class PlanetMongoRepository implements AddPlanetRepository {
  async add(planetData: AddPlanetModelDatabase): Promise<PlanetModel> {
    const planetCollection = MongoHelper.getCollection('planets');
    const result = await planetCollection.insertOne(planetData);
    return MongoHelper.map(result.ops[0]);
  }
}
