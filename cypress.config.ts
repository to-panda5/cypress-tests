import { defineConfig } from 'cypress';

module.exports = defineConfig({
  env: {
    ADMIN_EMAIL: 'admin@mail.com',
    ADMIN_PASSWORD: 'zaq1@WSX',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
