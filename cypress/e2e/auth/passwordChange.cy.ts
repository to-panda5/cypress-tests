export {};

const baseUrl = Cypress.config('baseUrl');
const customer = {
  name: 'Emily Johnson',
  email: 'emilyjohnson@mail.com',
  password: 'zaq1@WSX',
};
const newPassword = 'ZAQ!2wsx';

/**
 * Delete customer with given email if exists.
 */
before(() => {
  cy.deleteCustomerByEmail(customer.email);
});

/**
 * Create customer before every test.
 */
beforeEach(() => {
  cy.createCustomer({
    full_name: customer.name,
    email: customer.email,
    password: customer.password,
  });
});

/**
 * Delete customer after every test.
 */
afterEach(() => {
  cy.deleteCustomerByEmail(customer.email);
});

describe('Password change functionality', () => {
  it('Allows customer to login with new password', () => {
    cy.intercept('/api/customers/sessions').as('login1');

    cy.visit('/account/login');
    cy.get('.login-form input[name="email"]').type(customer.email);
    cy.get('.login-form input[name="password"]').type(customer.password);
    cy.get('.login-form button[type="submit"]').click();

    cy.wait('@login1');

    cy.visit('/account');
    cy.get('.account-details-name').should('contain', customer.name);
    cy.get('.account-details-email').should('contain', customer.email);
    cy.get('a').contains('Logout').click();

    cy.updateCustomerByEmail(customer.email, {
      password: newPassword,
    }).then(() => {
      cy.intercept('/api/customers/sessions').as('login2');

      cy.visit('/account/login');
      cy.get('.login-form input[name="email"]').type(customer.email);
      cy.get('.login-form input[name="password"]').type(newPassword);
      cy.get('.login-form button[type="submit"]').click();

      cy.wait('@login2');

      cy.visit('/account');
      cy.get('.account-details-name').should('contain', customer.name);
      cy.get('.account-details-email').should('contain', customer.email);
    });
  });

  it('Disallows customer to login with old password', () => {
    cy.intercept('/api/customers/sessions').as('login1');

    cy.visit('/account/login');
    cy.get('.login-form input[name="email"]').type(customer.email);
    cy.get('.login-form input[name="password"]').type(customer.password);
    cy.get('.login-form button[type="submit"]').click();

    cy.wait('@login1');

    cy.visit('/account');
    cy.get('.account-details-name').should('contain', customer.name);
    cy.get('.account-details-email').should('contain', customer.email);
    cy.get('a').contains('Logout').click();

    cy.updateCustomerByEmail(customer.email, {
      password: newPassword,
    }).then(() => {
      cy.intercept('/api/customers/sessions').as('login2');

      cy.visit('/account/login');
      cy.get('.login-form input[name="email"]').type(customer.email);
      cy.get('.login-form input[name="password"]').type(customer.password);
      cy.get('.login-form button[type="submit"]').click();

      cy.wait('@login2');

      cy.url().should('eq', `${baseUrl}/account/login`);
      cy.get('.login-form .text-critical')
        .invoke('text')
        .should('not.be.empty');
    });
  });
});
