export {};

const customerData = {
  fullName: 'John Doe 6259',
  email: `johndoe6259@mail.com`,
  password: 'zaq1@WSX',
};

beforeEach(() => {
  cy.deleteCustomerByEmail(customerData.email).then(() => {
    cy.createCustomer({
      full_name: customerData.fullName,
      email: customerData.email,
      password: customerData.password,
    });
  });
});

afterEach(() => {
  cy.deleteCustomerByEmail(customerData.email);
});

describe('Change password', () => {
  const baseUrl = Cypress.config('baseUrl');
  const newPassword = 'ZAQ!2wsx';

  it('Allows customer to login with new password', () => {
    cy.intercept('/api/customers/sessions').as('login1');

    cy.visit('/account/login');
    cy.get('.login-form input[name="email"]').type(customerData.email);
    cy.get('.login-form input[name="password"]').type(customerData.password);
    cy.get('.login-form button[type="submit"]').click();

    cy.wait('@login1');

    cy.visit('/account');
    cy.get('.account-details-name').should('contain', customerData.fullName);
    cy.get('.account-details-email').should('contain', customerData.email);
    cy.get('a').contains('Logout').click();

    cy.updateCustomerByEmail(customerData.email, {
      password: newPassword,
    }).then(() => {
      cy.intercept('/api/customers/sessions').as('login2');

      cy.visit('/account/login');
      cy.get('.login-form input[name="email"]').type(customerData.email);
      cy.get('.login-form input[name="password"]').type(newPassword);
      cy.get('.login-form button[type="submit"]').click();

      cy.wait('@login2');

      cy.visit('/account');
      cy.get('.account-details-name').should('contain', customerData.fullName);
      cy.get('.account-details-email').should('contain', customerData.email);
    });
  });

  it('Disallows customer to login with old password', () => {
    cy.intercept('/api/customers/sessions').as('login1');

    cy.visit('/account/login');
    cy.get('.login-form input[name="email"]').type(customerData.email);
    cy.get('.login-form input[name="password"]').type(customerData.password);
    cy.get('.login-form button[type="submit"]').click();

    cy.wait('@login1');

    cy.visit('/account');
    cy.get('.account-details-name').should('contain', customerData.fullName);
    cy.get('.account-details-email').should('contain', customerData.email);
    cy.get('a').contains('Logout').click();

    cy.updateCustomerByEmail(customerData.email, {
      password: newPassword,
    }).then(() => {
      cy.intercept('/api/customers/sessions').as('login2');

      cy.visit('/account/login');
      cy.get('.login-form input[name="email"]').type(customerData.email);
      cy.get('.login-form input[name="password"]').type(customerData.password);
      cy.get('.login-form button[type="submit"]').click();

      cy.wait('@login2');

      cy.url().should('eq', `${baseUrl}/account/login`);
      cy.get('.login-form .text-critical')
        .invoke('text')
        .should('not.be.empty');
    });
  });
});
