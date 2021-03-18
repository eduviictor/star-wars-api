export const planetsIdPath = {
  get: {
    tags: ['Planets'],
    summary: 'Route for search one planet by id',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/planet',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  delete: {
    tags: ['Planets'],
    summary: 'Route for delete a planet',
    responses: {
      200: {
        description: 'Planet deleted with success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
