export const addPlanetParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    climate: {
      type: 'string',
    },
    ground: {
      type: 'string',
    },
  },
  required: ['name', 'climate', 'ground'],
};
