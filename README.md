# Cypress Tests

## Installation

### Prerequisites

#### Node

To begin with the installation of Cypress, ensure that your Node version is `18.x` or `20.x` and above. This requirement is crucial, as outlined in the official documentation [here](https://docs.cypress.io/guides/getting-started/installing-cypress#Nodejs).

#### Linux

For Linux users, it's essential to verify the presence of all the required packages mentioned in the [documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites).

#### WSL

If you are using WSL, confirm the installation of an X-Server. A popular choice is [VcXsrv](https://sourceforge.net/projects/vcxsrv/).

### Setup

1. Check prerequisites, especially Node version.
1. Run `npm install` to install all the dependencies.
1. Stary Cypress with `npm run cypress:open` or `npx cypress open`.
1. A window will open with the Cypress test runner.

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
