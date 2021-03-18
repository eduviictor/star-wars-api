export const planetListSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/planet',
  },
};
