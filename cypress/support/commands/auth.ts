Cypress.Commands.add('authenticate', () =>
  cy.request({
    method: 'POST',
    url: '/api/user/sessions',
    body: {
      email: Cypress.env('ADMIN_EMAIL'),
      password: Cypress.env('ADMIN_PASSWORD'),
    },
  }),
);
