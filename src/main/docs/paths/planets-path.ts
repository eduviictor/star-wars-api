export const planetsPath = {
  get: {
    tags: ['Planets'],
    summary: 'Route for list all planets',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/planetList',
            },
          },
        },
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  post: {
    tags: ['Planets'],
    summary: 'Route for insert a planet',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addPlanetParams',
          },
        },
      },
    },
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
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
