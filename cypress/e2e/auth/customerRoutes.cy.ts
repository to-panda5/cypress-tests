export {};

const baseUrl = Cypress.config('baseUrl');
const customer = {
  name: 'Emily Johnson',
  email: 'emilyjohnson@mail.com',
  password: 'zaq1@WSX',
};

// Currently there is only one protected route for customers.
const cutomerProtectedRoutes = ['/account'];

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

describe('Customer routes protection', () => {
  it('Prevents from accessing customer routes without logging in', () => {
    cutomerProtectedRoutes.forEach((route) => {
      cy.visit(route);
      cy.url().should('eq', `${baseUrl}/`);
    });
  });

  it('Allows customer to access protected routes after logging in', () => {
    cy.get('#loginForm input[name="email"]').type(customer.email);
    cy.get('#loginForm input[name="password"]').type(customer.password);
    cy.get('#loginForm button[type="submit"]').click();
    cy.url().should('eq', `${baseUrl}/`);

    cutomerProtectedRoutes.forEach((route) => {
      cy.visit(route);
      cy.url().should('eq', `${baseUrl}${route}`);
    });
  });
});
