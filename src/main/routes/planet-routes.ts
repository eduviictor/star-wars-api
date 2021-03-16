import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPlanetController } from '../factories/add-planet';
import { Router } from 'express';
import { makeGetPlanetsController } from '../factories/get-planets';

export default (router: Router): void => {
  router.post('/planets', adaptRoute(makeAddPlanetController()));
  router.get('/planets', adaptRoute(makeGetPlanetsController()));
};
