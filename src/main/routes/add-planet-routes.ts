import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPlanetController } from '../factories/add-planet';

export default (router: Router): void => {
  router.post('/planets', adaptRoute(makeAddPlanetController()));
};
