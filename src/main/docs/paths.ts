import { planetsIdPath } from './paths/planets-id-path';
import { planetsNamePath } from './paths/planets-name-path';
import { planetsPath } from './paths/planets-path';

export default {
  '/planets': planetsPath,
  '/planets/{id}': planetsIdPath,
  '/planets/name/{name}': planetsNamePath,
};
