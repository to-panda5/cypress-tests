import { defineConfig } from 'cypress';

import { SHOPMOST_BASE_URL } from 'cypress.env.json';

module.exports = defineConfig({
  e2e: {
    baseUrl: SHOPMOST_BASE_URL,
  },
});
