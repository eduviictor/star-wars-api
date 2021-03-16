import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPlanetController } from '../factories/add-planet';
import { Router } from 'express';
import { makeGetPlanetsController } from '../factories/get-planets';
import { makeGetPlanetsByNameController } from '../factories/get-planets-by-name';
import { makeGetPlanetsByIdController } from '../factories/get-planets-by-id';

export default (router: Router): void => {
  router.post('/planets', adaptRoute(makeAddPlanetController()));
  router.get('/planets', adaptRoute(makeGetPlanetsController()));
  router.get(
    '/planets/name/:name',
    adaptRoute(makeGetPlanetsByNameController())
  );
  router.get('/planets/id/:id', adaptRoute(makeGetPlanetsByIdController()));
};
