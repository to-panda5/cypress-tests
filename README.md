# Cypress Tests

## Setup

### Cypress setup

1. Check [prerequisites](#prerequisites).
1. Run `npm install`.
1. Create environment variables file:
   - Make copy of `.env_template` file.
   - Update values in the copy.
   - Rename copy to `.env`.
1. Run `npm run cypress:open` or `npx cypress open` to start Cypress.
1. A window will open with the Cypress test runner.

### Prerequisites

- **Node** - Ensure that your Node version is `18.x` or `20.x` and above ([docs](https://docs.cypress.io/guides/getting-started/installing-cypress#Nodejs)).
- **For Linux users** - For Linux users, it's essential to verify the presence of all the required packages mentioned in the [documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites).
- **For WSL users** - If you are using WSL, confirm the installation of an X-Server, a popular choice is [VcXsrv](https://sourceforge.net/projects/vcxsrv/).

## Other

### Shopmost Postman Collection

Link to [collection](https://api.postman.com/collections/11681323-9dbb4b99-72af-4200-bfed-0944d71e09e2?access_key=PMAT-01HHM5WPMC6A6R10TPH8FHJH9F), just download and import into the Postman.

### Shopmost Setup

1. Start Postgres instance.
   ```sh
   docker run --name shopmost-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=shopmost -d -p 5432:5432 postgres:13.12
   ```
1. In Shopmost checkout to latest working branch (optionally create your own branch for testing purposes).
   ```sh
   git checkout 1d95be030580401426ab7e66966dd804a14be64e
   git switch -c testing
   ```
1. Setup Shopmost application.
