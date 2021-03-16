import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPlanetController } from '../factories/add-planet';
import { Router } from 'express';
import { makeGetPlanetsController } from '../factories/get-planets';
import { makeGetPlanetsByNameController } from '../factories/get-planets-by-name';

export default (router: Router): void => {
  router.post('/planets', adaptRoute(makeAddPlanetController()));
  router.get('/planets', adaptRoute(makeGetPlanetsController()));
  router.get('/planets/:name', adaptRoute(makeGetPlanetsByNameController()));
};
