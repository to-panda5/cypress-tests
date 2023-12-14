export {};

const baseUrl = Cypress.config('baseUrl');
const customer = {
  name: 'Emily Johnson',
  email: 'emilyjohnson@mail.com',
  password: 'zaq1@WSX',
};

/**
 * Delete customer with given email if exists.
 */
before(() => {
  cy.deleteCustomerByEmail(customer.email);
});

/**
 * Delete customer after tests.
 */
after(() => {
  cy.deleteCustomerByEmail(customer.email);
});

describe('Customer new account registration', () => {
  it('Registers new customer account', () => {
    cy.visit('/account/register');

    cy.get('.register-form input[name="full_name"]').type(customer.name);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(customer.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('a[href="/account').click();

    cy.get('.account-details-name').should('contain', customer.name);
    cy.get('.account-details-email').should('contain', customer.email);
  });

  it('Prevents from registering new customer account with existing email', () => {
    cy.visit('/account/register');

    cy.get('.register-form input[name="full_name"]').type(customer.name);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(customer.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('.register-form .text-critical')
      .invoke('text')
      .should('not.be.empty');
  });
});
