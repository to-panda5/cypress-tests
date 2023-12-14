Cypress.Commands.add('getCustomers', () =>
  cy.authenticate().request({
    method: 'GET',
    url: '/api/graphql',
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
  cy.authenticate().request({
    method: 'GET',
    url: '/api/graphql',
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
  cy.authenticate().request({
    method: 'DELETE',
    url: `/api/customers/${uuid}`,
  });
});
