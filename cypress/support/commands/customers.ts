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

Cypress.Commands.add('createCustomer', (body) =>
  cy.authenticate().request({
    method: 'POST',
    url: '/api/customers',
    body,
  }),
);

Cypress.Commands.add('updateCustomer', (uuid, body) =>
  cy.authenticate().request({
    method: 'PATCH',
    url: `/api/customers/${uuid}`,
    body,
  }),
);

Cypress.Commands.add('updateCustomerByEmail', (email, body) =>
  cy.getCustomersByEmail(email).then((response) => {
    const customer = response.body.data.customers.items?.[0];
    if (customer) {
      return cy.updateCustomer(customer.uuid, body);
    }
  }),
);

Cypress.Commands.add('deleteCustomer', (uuid) =>
  cy.authenticate().request({
    method: 'DELETE',
    url: `/api/customers/${uuid}`,
  }),
);

Cypress.Commands.add('deleteCustomerByEmail', (email) =>
  cy.getCustomersByEmail(email).then((response) => {
    const customer = response.body.data.customers.items?.[0];
    if (customer) {
      return cy.deleteCustomer(customer.uuid);
    }
  }),
);
