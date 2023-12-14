export {};

const baseUrl = Cypress.config('baseUrl');
const customer = {
  name: 'Emily Johnson',
  email: 'emilyjohnson@mail.com',
};
let password: string;

/**
 * Delete customer with given email if exists.
 */
before(() => {
  cy.deleteCustomerByEmail(customer.email);
});

/**
 * Delete customer after every test.
 */
afterEach(() => {
  cy.deleteCustomerByEmail(customer.email);
});

describe('Password complexity requirements', () => {
  const runOptionalTests = Cypress.env('RUN_OPTIONAL_TESTS');

  it('Displays error for empty password', () => {
    cy.visit('/account/register');
    cy.get('.register-form input[name="full_name"]').type(customer.name);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('.register-form .text-critical')
      .invoke('text')
      .should('not.be.empty');
  });

  it('Displays error for short password (less than 8 characters)', () => {
    password = 'abc';
    cy.intercept('POST', '/api/customers/sessions').as('login');

    cy.visit('/account/register');
    cy.get('.register-form input[name="full_name"]').type(customer.name);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(password);
    cy.get('.register-form button[type="button"]').click();

    cy.wait('@login');

    cy.url().should('eq', `${baseUrl}/account/register`);
    cy.get('.register-form .text-critical')
      .invoke('text')
      .should('not.be.empty');
  });

  // OPTIONAL TEST
  if (runOptionalTests) {
    it('Displays error for incomplete password (missing character groups)', () => {
      password = 'abcabcabcabcabc';
      cy.intercept('POST', '/api/customers/sessions').as('login');

      cy.visit('/account/register');
      cy.get('.register-form input[name="full_name"]').type(customer.name);
      cy.get('.register-form input[name="email"]').type(customer.email);
      cy.get('.register-form input[name="password"]').type(password);
      cy.get('.register-form button[type="button"]').click();

      cy.wait('@login');

      cy.url().should('eq', `${baseUrl}/account/register`);
      cy.get('.register-form .text-critical')
        .invoke('text')
        .should('not.be.empty');
    });
  }

  it('Successfully creates account or changes password with valid password', () => {
    password = 'sk[MV&v-898h[lllprv[DUo';

    cy.visit('/account/register');
    cy.get('.register-form input[name="full_name"]').type(customer.name);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.get('a[href="/account').click();

    cy.get('.account-details-name').should('contain', customer.name);
    cy.get('.account-details-email').should('contain', customer.email);
  });

  // OPTIONAL TEST
  if (runOptionalTests) {
    it('Enforces custom password policy for admin (Optional)', () => {
      throw new Error('Not implemented');
    });
  }
});
