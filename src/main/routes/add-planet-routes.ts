import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPlanetController } from '../factories/add-planet';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/planets', adaptRoute(makeAddPlanetController()));
};
