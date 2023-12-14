export {};

const baseUrl = Cypress.config('baseUrl');
const customer = {
  name: 'Emily Johnson',
  email: 'emilyjohnson@mail.com',
  password: 'zaq1@WSX',
};

/**
 * Delete (if exists) and then create customer with given email.
 */
before(() => {
  cy.deleteCustomerByEmail(customer.email).then(() => {
    cy.createCustomer({
      full_name: customer.name,
      email: customer.email,
      password: customer.password,
    });
  });
});

/**
 * Go to login page before every test.
 */
beforeEach(() => {
  cy.visit('/account/login');
});

/**
 * Delete customer after tests.
 */
after(() => {
  cy.deleteCustomerByEmail(customer.email);
});

describe('Customer login and logout', () => {
  it('Allows customer to login', () => {
    cy.get('#loginForm input[name="email"]').type(customer.email);
    cy.get('#loginForm input[name="password"]').type(customer.password);
    cy.get('#loginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/`);

    cy.visit('/account');
    cy.get('.account-details-name').contains(customer.name);
    cy.get('.account-details-email').contains(customer.email);
  });

  it('Allows customer to logout', () => {
    cy.get('#loginForm input[name="email"]').type(customer.email);
    cy.get('#loginForm input[name="password"]').type(customer.password);
    cy.get('#loginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/`);

    cy.visit('/account');
    cy.get('a').contains('Logout').click();

    cy.url().should('eq', `${baseUrl}/`);
  });

  it('Prevents from logging in with invalid credentials', () => {
    cy.get('#loginForm input[name="email"]').type('invalid@mail.com');
    cy.get('#loginForm input[name="password"]').type('invalid');
    cy.get('#loginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/account/login`);
    cy.get('.login-form .text-critical')
      .should('have.length', 1)
      .invoke('text')
      .should('not.be.empty');
  });
});
