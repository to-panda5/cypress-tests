Cypress.Commands.add('authenticate', () =>
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/user/sessions',
    body: {
      email: 'admin@mail.com',
      password: 'zaq1@WSX',
    },
  }),
);

Cypress.Commands.add('getCustomers', () =>
  cy.request({
    method: 'GET',
    url: 'http://localhost:3000/api/graphql',
    body: {
      query: `
        query {
          customers {
            items {
              uuid
              fullName
              email
            }
          }
        }
      `,
    },
  }),
);

Cypress.Commands.add('getCustomersByEmail', (email: string) =>
  cy.request({
    method: 'GET',
    url: 'http://localhost:3000/api/graphql',
    body: {
      query: `
        query ($customerEmail: String) {
          customers(
            filters: [
              {
                operation: "=",
                key: "email",
                value: $customerEmail
              }
            ]
          ) {
            items {
              uuid
              fullName
              email
            }
          }
        }
      `,
      variables: {
        customerEmail: email,
      },
    },
  }),
);

Cypress.Commands.add('deleteCustomer', (uuid: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:3000/api/customers/${uuid}`,
  });
});
