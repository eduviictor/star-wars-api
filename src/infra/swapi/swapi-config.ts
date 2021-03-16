require('dotenv').config();

export const SwapiConfig = {
  url: process.env.SWAPI_URL || 'https://swapi.dev/api',
  headers: {},
};
