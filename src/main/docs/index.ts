import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Star Wars API',
    description: 'Documentation of a simple Star Wars api.',
    version: '1.0.0',
    contact: {
      name: 'Eduardo Victor',
      email: 'eduvictornobrega@gmail.com',
      url: 'https://www.linkedin.com/in/eduviictor',
    },
  },
  externalDocs: {
    description: 'Repository link',
    url: 'https://github.com/eduviictor/star-wars-api',
  },
  servers: [
    {
      url: '/',
      description: 'Server',
    },
  ],
  tags: [
    {
      name: 'Planets',
      description: 'Routes related to the planets',
    },
  ],
  paths,
  schemas,
  components,
};
