const customerData = {
  fullName: 'John Doe 6259',
  email: `johndoe6259@mail.com`,
  password: 'zaq1@WSX',
};

/**
 * Delete customer with given email if exists.
 */
before(() => {
  cy.getCustomersByEmail(customerData.email).then(({ body }) => {
    const customer = body.data.customers.items?.[0];
    if (customer) cy.deleteCustomer(customer.uuid);
  });
});

describe('Customer new account registration', () => {
  const baseUrl = Cypress.config('baseUrl');

  it('Registers new customer account', () => {
    cy.visit('/account/register');

    cy.get('.register-form input[name="full_name"]').type(
      customerData.fullName,
    );
    cy.get('.register-form input[name="email"]').type(customerData.email);
    cy.get('.register-form input[name="password"]').type(customerData.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('a[href="/account').click();

    cy.get('.account-details-name').should('contain', customerData.fullName);
    cy.get('.account-details-email').should('contain', customerData.email);
  });

  it('Prevents from registering new customer account with existing email', () => {
    cy.visit('/account/register');

    cy.get('.register-form input[name="full_name"]').type(
      customerData.fullName,
    );
    cy.get('.register-form input[name="email"]').type(customerData.email);
    cy.get('.register-form input[name="password"]').type(customerData.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('.register-form .text-critical').should(
      'contain',
      'duplicate key value violates unique constraint "EMAIL_UNIQUE"',
    );
  });
});

/**
 * Clean up after tests.
 */
after(() => {
  cy.getCustomersByEmail(customerData.email).then(({ body }) => {
    const customer = body.data.customers.items?.[0];
    if (customer) cy.deleteCustomer(customer.uuid);
  });
});
