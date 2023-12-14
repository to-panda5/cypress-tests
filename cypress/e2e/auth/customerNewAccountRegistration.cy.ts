const customerData = {
  fullName: 'John Doe',
  email: `johndoe@mail.com`,
  password: 'zaq1@WSX',
};

describe('Customer new account registration', () => {
  it('Registers new customer account', () => {
    cy.visit('http://localhost:3000/account/register');

    cy.get('.register-form input[name="full_name"]').type(
      customerData.fullName,
    );
    cy.get('.register-form input[name="email"]').type(customerData.email);
    cy.get('.register-form input[name="password"]').type(customerData.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', 'http://localhost:3000/account/register');
    cy.get('a[href="/account').click();

    cy.get('.account-details-name').should('contain', customerData.fullName);
    cy.get('.account-details-email').should('contain', customerData.email);
  });

  it('Prevents from registering new customer account with existing email', () => {
    cy.visit('http://localhost:3000/account/register');

    cy.get('.register-form input[name="full_name"]').type(
      customerData.fullName,
    );
    cy.get('.register-form input[name="email"]').type(customerData.email);
    cy.get('.register-form input[name="password"]').type(customerData.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', 'http://localhost:3000/account/register');
    cy.get('.register-form .text-critical').should(
      'contain',
      'duplicate key value violates unique constraint "EMAIL_UNIQUE"',
    );
  });
});

after(() => {
  cy.authenticate()
    .getCustomersByEmail(customerData.email)
    .then(({ body }) => {
      const customer = body.data.customers.items[0];
      cy.deleteCustomer(customer.uuid);
    });
});
