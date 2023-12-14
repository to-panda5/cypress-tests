import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default defineConfig({
  e2e: {
    baseUrl: env.SHOPMOST_BASE_URL,
  },
  env,
});
