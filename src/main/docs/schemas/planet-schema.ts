export const planetSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    climate: {
      type: 'string',
    },
    ground: {
      type: 'string',
    },
    movies: {
      type: 'number',
    },
  },
  required: ['id', 'name', 'climate', 'ground', 'movies'],
};
