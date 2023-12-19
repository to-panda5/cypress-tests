export {};

const baseUrl = Cypress.config('baseUrl');
const email = Cypress.env('ADMIN_EMAIL');
const password = Cypress.env('ADMIN_PASSWORD');

/**
 * Clear all cookies before every test (in case of using cy.authenticate()).
 */
beforeEach(() => {
  cy.clearAllCookies();
  cy.visit('/admin/login');
});

describe('Admin login and logout', () => {
  it('Allows admin to login', () => {
    cy.get('form#adminLoginForm input[name="email"]').type(email);
    cy.get('form#adminLoginForm input[name="password"]').type(password);
    cy.get('form#adminLoginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/admin`);
    cy.get('.page-heading-title').should('contain', 'Dashboard');

    cy.visit('/admin/products');
    cy.url().should('eq', `${baseUrl}/admin/products`);
    cy.get('.page-heading-title').should('contain', 'Products');

    cy.visit('/admin/customers');
    cy.url().should('eq', `${baseUrl}/admin/customers`);
    cy.get('.page-heading-title').should('contain', 'Customers');
  });

  it('Allows admin to logout', () => {
    cy.get('form#adminLoginForm input[name="email"]').type(email);
    cy.get('form#adminLoginForm input[name="password"]').type(password);
    cy.get('form#adminLoginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/admin`);
    cy.get('a.first-letter').click();
    cy.get('a.text-critical').contains('Logout').click();

    cy.url().should('eq', `${baseUrl}/admin/login`);
  });

  it('Prevents from logging in with invalid credentials', () => {
    cy.get('form#adminLoginForm input[name="email"]').type('invalid@mail.com');
    cy.get('form#adminLoginForm input[name="password"]').type('invalid');
    cy.get('form#adminLoginForm button[type="submit"]').click();

    cy.url().should('eq', `${baseUrl}/admin/login`);
    cy.get('.admin-login-form .text-critical')
      .should('have.length', 1)
      .invoke('text')
      .should('not.be.empty');
  });
});
